"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_records_1 = __importDefault(require("./routes/financial-records"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
const handleServerError = (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please try the following:
        1. Kill the process using the port:
        - On Windows: netstat -ano | findstr :${port}
        - then taskkill /PID 1234 /F
        - On Mac/Linux: lsof -i :${port}
        2. Or change the port number in the code`);
        process.exit(1);
    }
    else {
        console.error('Server error: ', error);
    }
};
const mongoURI = process.env.MONGO_URI || "http://localhost:3000/";
// const originURL: string = process.env.FRONTEND_URL || "";
const corsOptions = {
    origin: 'https://personal-finance-tracker-sage-alpha.vercel.app', // Only allow this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
mongoose_1.default.connect(mongoURI).then(() => console.log("CONNECTED TO MONGODB!")).catch((err) => console.error("Failed to Connect to MongoDB:", err));
app.use("/financial-records", financial_records_1.default);
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
}).on('error', handleServerError);
