import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

interface FinancialRecord {
    id?: string;
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

    // updateRecord: (id: string, newRecord: FinancialRecord) => void;
    // deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
    FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const { user } = useUser();

    const fetchRecords = async () => {
      if (!user) return;
      const response = await fetch(
        `http://localhost:3001/financial-records/getAllByUserID/${user.id}`
      );
  
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
      const response = await fetch("http://localhost:3001/financial-records", {
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

    return (
    <FinancialRecordsContext.Provider value={{ records, addRecord }}>
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