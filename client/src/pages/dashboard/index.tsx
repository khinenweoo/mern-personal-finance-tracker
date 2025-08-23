import { FinancialRecordList } from "./financial-record-list";
import './financial-record.css';
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import formatToUSD from "./formatToUSD";

export const Dashboard = () => {
    const { records } = useFinancialRecords();

    const totalExpenseAmount = useMemo(() => {
        let totalAmount = 0;
        let expenses = records.filter(record => record.type === 'expenses');
        expenses.forEach((expense) => {
            totalAmount += expense.amount;
        });

        return formatToUSD(totalAmount);
    }, [records]);

    const totalIncomeAmount = useMemo(() => {
        let incomeTotal = 0;
        let incomes = records.filter(record => record.type === 'income');
        incomes.forEach((income) => {
            incomeTotal += income.amount;
        });

        return formatToUSD(incomeTotal);
    }, [records]);

    const totalExpenseCount = useMemo(() => {
        let expenseCount = 0;
        let expenses = records.filter(record => record.type === 'expenses');
        expenses.forEach(() => {
            expenseCount += 1;
        });

        return expenseCount;

    }, [records]);

    const totalIncomeCount = useMemo(() => {
        let incomeCount = 0;
        let incomeRecord = records.filter(record => record.type === 'income');
        incomeRecord.forEach(() => {
            incomeCount += 1;
        });

        return incomeCount;

    }, [records]);

    return (
        <div className="dashboard-container w-[80%] p-10 flex-1">
            <div className="w-full mx-auto overflow-hidden mb-6 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 w-full min-w-0">

                    <div className="total-card flex flex-col px-6 py-2 border bg-gray-50 dark:bg-slate-800 dark:border-gray-600 shadow-md rounded-xl">
                        <div className="flex flex-col space-y-2">
                            <div className="text-6xl font-bold tracking-tight leading-none text-red-300">
                                {/* <i className='bx bx-money-withdraw text-6xl'></i> */}
                                <i className='bx bx-dollar text-6xl'></i>
                            </div>
                            <div className="text-md font-medium text-red-400">Total Expenses</div>
                            <span className="total-amount text-red-500 text-expense">{totalExpenseAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="total-card flex flex-col px-6 py-2 border bg-gray-50 dark:bg-slate-800 dark:border-gray-600 shadow-md rounded-lg">
                        <div className="flex flex-col space-y-2">
                            <div className="text-6xl font-bold tracking-tight leading-none text-green-300">
                                <i className='bx bx-credit-card-front text-6xl'></i>
                            </div>
                            <div className="text-md font-medium text-green-400">
                                Total Income
                            </div>
                            <span className="total-amount text-green-400 text-expense">{totalIncomeAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="total-card flex flex-col px-6 py-2 border bg-gray-50 dark:bg-slate-800 dark:border-gray-600 shadow-md rounded-lg">
                        <div className="flex flex-col space-y-2">
                            <div className="text-6xl font-bold tracking-tight leading-none text-orange-300">
                                <i className='bx bx-wallet text-6xl'></i>
                            </div>
                            <div className="text-md font-medium text-orange-400">Total Expenses Count</div>
                            <span className="total-amount text-orange-400 text-expense">{totalExpenseCount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="total-card flex flex-col px-6 py-2 border bg-gray-50 dark:bg-slate-800 dark:border-gray-600 shadow-md rounded-lg">
                        <div className="flex flex-col space-y-2">
                            <div className="text-6xl font-bold tracking-tight leading-none text-blue-300">
                                <i className='bx bxl-deezer text-6xl'></i>
                            </div>
                            <div className="text-md font-medium text-blue-400">
                                Total Income Count
                            </div>
                            <span className="total-amount text-blue-400 text-expense">{totalIncomeCount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="content-wrapper">

                <FinancialRecordList />
            </div>
        </div>
    )
}