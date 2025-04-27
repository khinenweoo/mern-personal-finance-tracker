import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 4001;

const handleServerError = (error: any) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please try the following:
        1. Kill the process using the port:
        - On Windows: netstat -ano | findstr :${port}
        - then taskkill /PID 1234 /F
        - On Mac/Linux: lsof -i :${port}
        2. Or change the port number in the code`);
        process.exit(1);
    } else {
        console.error('Server error: ', error);
    }
}

const mongoURI: string = process.env.MONGO_URI || "http://localhost:3000/";
const originURL: string = process.env.FRONTEND_URL || "";
const corsOptions = {
    origin: originURL, // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(express.json());
app.use(cors(corsOptions));


mongoose.connect(mongoURI).then(() => console.log("CONNECTED TO MONGODB!")).catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
}).on('error', handleServerError);