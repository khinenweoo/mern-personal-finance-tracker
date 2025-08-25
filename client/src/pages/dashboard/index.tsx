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


    return (
        <div id="content" className="flex-1 pb-12 space-y-8 overflow-y-auto bg-gray-100 dark:bg-slate-950 lg:h-screen md:space-y-8">

            <div className="relative mx-auto mb-6 p-8">
                <section className="flex flex-col w-full md:justify-between md:items-center md:flex-row mb-8">
                    <div>
                        <h2 className="text-3xl font-medium text-left text-[#1f2c73] dark:text-white">Dashboard</h2>
                        <p className="mt-2 text-sm text-gray-500">Welcome SmartSpender Finance Management</p>
                    </div>

                    <div className="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
                        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
                            <a href="#" className="text-gray-600 dark:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </a>

                            <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>

                            <a href="#" className="text-gray-600 dark:text-gray-200 hover:underline">
                                Dashboard
                            </a>

                        </div>
                    </div>
                </section>
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 w-full min-w-0">

                    <div className="flex items-center px-6 py-8 bg-white dark:bg-slate-800 dark:border-gray-600 rounded-lg shadow-md shadow-gray-200 dark:shadow-sm dark:shadow-gray-500">
                        <div className="flex items-center -mx-2">
                            <div className="p-5 text-white bg-blue-300 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>

                            <div className="mx-2">

                                <p className="mt-1 text-sm font-medium text-[#1f2c73] dark:text-white">Total Balance</p>
                                <h3 className="text-2xl font-medium text-[#1f2c73] dark:text-gray-300">{totalIncomeAmount.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center px-6 py-8 bg-white dark:bg-slate-800 dark:border-gray-600 rounded-lg shadow-md shadow-gray-200 dark:shadow-sm dark:shadow-gray-500">
                        <div className="flex items-center -mx-2">
                            <svg className="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="35" cy="35" r="35" fill="#FF4C61" fillOpacity="0.05" />
                                <path d="M26 32L32 38L36 34L43.405 41.405" stroke="#FF4C61" strokeWidth="2"
                                    strokeLinecap="square" />
                                <path d="M43.405 41.405L44 42" stroke="#FF4C61" strokeWidth="2" strokeLinecap="round" />
                                <path d="M44 39V42H41" stroke="#FF4C61" strokeWidth="2" strokeLinecap="square" />
                            </svg>

                            <div className="mx-2">
                                <p className="mt-1 text-sm font-medium text-[#1f2c73] dark:text-white">Total Expenses</p>
                                <h3 className="text-2xl font-medium text-[#1f2c73] dark:text-gray-300">{totalExpenseAmount.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center px-6 py-8 bg-white dark:bg-slate-800 dark:border-gray-600 rounded-lg shadow-md shadow-gray-200 dark:shadow-sm dark:shadow-gray-500">
                        <div className="flex items-center -mx-2">
                            <svg className="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="35" cy="35" r="35" fill="#33D69F" fillOpacity="0.07" />
                                <path d="M26 39L31 34" stroke="#21B8C7" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path
                                    d="M32 34C32.5523 34 33 33.5523 33 33C33 32.4477 32.5523 32 32 32C31.4477 32 31 32.4477 31 33C31 33.5523 31.4477 34 32 34Z"
                                    stroke="#21B8C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M37 39C37.5523 39 38 38.5523 38 38C38 37.4477 37.5523 37 37 37C36.4477 37 36 37.4477 36 38C36 38.5523 36.4477 39 37 39Z"
                                    stroke="#21B8C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M38 37L44 31M33 34L36 37L33 34Z" stroke="#21B8C7" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <div className="mx-2">
                                <p className="mt-1 text-sm font-medium text-[#1f2c73] dark:text-white">Total Saving</p>
                                <h3 className="text-2xl font-medium text-[#1f2c73] dark:text-gray-300">$0.00</h3>
                            </div>
                        </div>
                    </div>



                </div>

                {/*  */}
                <div className="my-6">
                    <FinancialRecordList />
                </div>


            </div>
        </div>
    )
}