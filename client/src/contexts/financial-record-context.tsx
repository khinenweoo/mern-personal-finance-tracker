import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';


export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    type: string;
    paymentMethod: string;
};

interface FinancialRecordContextType {
    records: FinancialRecord[];
    // return void because we're not gonna return anything, the main purpose is send it to dababase
    addRecord: (record: FinancialRecord) => void;

    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
    searchRecord: (searchValue: string) => void;
    fetchRecords: () => void;
    isLoading: boolean;
}

export const FinancialRecordsContext = createContext<
    FinancialRecordContextType | undefined
>(undefined);

// create component which gonna be provider
// children from whichever components we wrap this around with
export const FinancialRecordsProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    const fetchRecords = async () => {
      if (!user) return;
      const response = await fetch(
        `${baseUrl}/financial-records/getAllByUserID/${user.id}`
      );
  
      if (response.ok) {
        const records = await response.json();
        setRecords(records);
      }
    };


    const searchRecord = async (query: string) => {
      if (!user) return;
      setIsLoading(true);
      const userId = user?.id;
      const response = await fetch(`${baseUrl}/financial-records/view-records?user=${encodeURIComponent(userId)}&query=${encodeURIComponent(query)}`, {
        method: "GET",
      });

       // Simulate a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        console.log('Filtered data');
        console.log(data);
        setRecords(data);
      } catch (error) {
        console.error('There was a problem with the search operation:', error);
      } finally {
        setIsLoading(false);
      }

    }

    // we want this fetch function call on render, gonna use use effect
    useEffect(() => {
      fetchRecords();
    }, [user]);// only run just once


    const addRecord = async (record: FinancialRecord) => {
      const response = await fetch(`${baseUrl}/financial-records/`, {
        method: "POST", 
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        }
      });

        try{
          if (response.ok) {
            const newRecord = await response.json();
            setRecords((prev) =>  [...prev, newRecord]);
            toast.success(`New expense added successfully`);
          }
        } catch (err) {
            toast.error("Failed to add new expense!");
        }

    };

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
      const response = await fetch(`${baseUrl}/financial-records/${id}`, {
        method: "PUT", 
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        }
      });

        try{
          if (response.ok) {
            const newRecord = await response.json();
            setRecords((prev) =>  prev.map((record) => {
              if (record._id === id) {
                return newRecord;
              } else {
                return record;
              }
            }));
            toast.success(`Entry is updated successfully`);
          }
        } catch (err) {
          toast.error("Failed to update the expense!");
        }

    };

    const deleteRecord = async (id: string) => {
      const response = await fetch(`${baseUrl}/financial-records/${id}`, {
        method: "DELETE", 
      });

        try{
          if (response.ok) {
            const deletedRecord = await response.json();
            setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
            toast.success(`An entry is deleted successfully`);
          }
        } catch (err) {
          toast.error("Failed to delete expense!");
        }
    }

    // inside of this is just render children
    // value are the state -> records and all the functions we created inside this provider
    return (
    <FinancialRecordsContext.Provider value={{ records, isLoading, addRecord, updateRecord, deleteRecord, searchRecord, fetchRecords  }}>
      {""}
      {children}
    </FinancialRecordsContext.Provider>
    )
  
};

// create custom hook
export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
  }

  return context;
}