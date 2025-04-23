import mongoose from "mongoose";

interface FinancialRecord {
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}
// define the schema
const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userId: { type: String, required: true},
    date: { type: Date, required: true},
    description: { type: String, required: true},
    amount: { type: Number, required: true},
    category: { type: String, required: true},
    paymentMethod: { type: String, required: true},
});

// create a model and give a name to this collection db called 'FinancialRecord'
const FinancialRecordModel = mongoose.model<FinancialRecord>("FinancialRecord", financialRecordSchema);

export default FinancialRecordModel;
