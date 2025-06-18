import FinancialRecordModel from "../schema/financial-record";
import express, { Request, Response } from "express";

export const getRecords = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const records = await FinancialRecordModel.find({userId: userId});

        if (records.length === 0) {
            return res.status(404).send("No records found for the user.");
        }
        res.status(200).send(records);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const filterRecords = async (req: Request, res: Response) => {
    try {
        const userId = req.query.user; // Access the user query parameter
        const query = req.query.query;   // Access the query parameter

        if (!userId || !query) {
            return res.status(400).send("User ID and query parameters are required");
        }

        if (typeof query !== 'string') {
            return res.status(400).send("Query params must be a string");
        }

        // Escape special characters in query string for regex
        const escapedQuery = query.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&');

        // Prepare regex for string fields with case insensitive option
        const regex = new RegExp(escapedQuery, 'i');

        let orConditions: any[] = [
            { description: { $regex: regex } },
            { category: { $regex: regex } },
            { type: {$regex: regex } },
            { paymentMethod: { $regex: regex } }
        ];

        let data = await FinancialRecordModel.find({
            userId: userId,
            $or: orConditions
        });

        if (data.length === 0) {
            return res.status(404).send("No record match for the user.");
        }

        return res.status(200).send(data);

    } catch (error)  {
        console.error("Error occurred while filtering records:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const createRecord = async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newRecordBody);
        const saveRecord = await newRecord.save();

        res.status(200).send(saveRecord);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(
            id,
            newRecordBody,
            {new: true}
        );
      
        if (!record) return res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);
        if (!record) return res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
}