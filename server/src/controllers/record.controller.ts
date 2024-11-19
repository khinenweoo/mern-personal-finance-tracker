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