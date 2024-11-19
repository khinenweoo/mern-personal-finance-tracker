// qOE8uPb05jDODOm3
import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

const mongoURI: string ="mongodb+srv://devkhinenweoo:qOE8uPb05jDODOm3@personalfinancetracker.o79qv.mongodb.net/";

app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI).then(() => console.log("CONNECTED TO MONGODB!")).catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
})
