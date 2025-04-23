import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
};

interface FinancialRecordContextType {
    records: FinancialRecord[];
    // return void because we're not gonna return anything, the main purpose is send it to dababase
    addRecord: (record: FinancialRecord) => void;

    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
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
    const url = "http://localhost:27001/financial-records";

    const fetchRecords = async () => {
      if (!user) return;
      const response = await fetch(
        `${url}/getAllByUserID/${user.id}`
      );
      console.log(url);
  
      if (response.ok) {
        const records = await response.json();
        console.log(records);
        setRecords(records);
      }
    };

    // we want this fetch function call on render, gonna use use effect
    useEffect(() => {
      fetchRecords();
    }, [user]);// only run just once


    const addRecord = async (record: FinancialRecord) => {
      const response = await fetch(url, {
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
          }
        } catch (err) {

        }

    };

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
      const response = await fetch(`${url}/${id}`, {
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
          }
        } catch (err) {}

    };

    const deleteRecord = async (id: string) => {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE", 
      });

        try{
          if (response.ok) {
            const deletedRecord = await response.json();
            setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
          }
        } catch (err) {

        }
    }

    // inside of this is just render children
    // value are the state -> records and all the functions we created inside this provider
    return (
    <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
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