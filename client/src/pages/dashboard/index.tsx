import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import './financial-record.css';
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";

export const Dashboard = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords();

    const totalMonthly = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });

        return totalAmount;
    }, [records])

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1>Welcome back,</h1>
                    <span className="user-name">{user?.firstName}!</span>
                </div>
                <div className="stats-cards">
                    <div className="total-card">
                        <span className="total-label">Total Monthly</span>
                        <span className="total-amount">${totalMonthly.toLocaleString()}</span>
                    </div>
                </div>
            </div>
 
            <div className="content-wrapper">
                <FinancialRecordForm />
                <FinancialRecordList />
            </div>
        </div>
    )
}