import { FinancialRecordList } from "./financial-record-list";
import './financial-record.css';
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";

export const Dashboard = () => {
    const { records } = useFinancialRecords();

    const totalMonthly = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });

        return totalAmount;
    }, [records])

    return (
        <div className="dashboard-container w-[89%] p-8 my-14 md:my-5">
            <div className="w-full mx-auto overflow-hidden mb-6 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 w-full min-w-0">

                    <div className="total-card flex flex-col px-6 py-2 border bg-gray-50 dark:bg-slate-800 dark:border-gray-600 shadow-md rounded-xl">
                        <div className="flex flex-col space-y-2">
                            <div className="text-6xl font-bold tracking-tight leading-none text-red-300">
                                {/* <i className='bx bx-money-withdraw text-6xl'></i> */}
                                <i className='bx bx-dollar text-6xl'></i>
                            </div>
                            <div className="text-md font-medium text-red-400">Total Expenses</div>
                            <span className="total-amount text-red-300 text-expense">${totalMonthly.toLocaleString()}</span>
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
                            <span className="total-amount text-green-300 text-expense">$30.00</span>
                        </div>
                    </div>

                    <div className="total-card flex flex-col px-6 py-2 border bg-gray-50 dark:bg-slate-800 dark:border-gray-600 shadow-md rounded-lg">
                        <div className="flex flex-col space-y-2">
                            <div className="text-6xl font-bold tracking-tight leading-none text-orange-300">
                                <i className='bx bx-wallet text-6xl'></i>
                            </div>
                            <div className="text-md font-medium text-orange-400">Total Expenses Count</div>
                            <span className="total-amount text-orange-300 text-expense">2</span>
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
                            <span className="total-amount text-blue-300 text-expense">3</span>
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