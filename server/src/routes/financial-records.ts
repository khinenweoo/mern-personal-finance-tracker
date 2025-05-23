import express, { Request, Response } from "express";
import { createRecord, deleteRecord, getRecords, updateRecord, filterRecords } from "../controllers/record.controller";

// define all API endpoints/ routes
const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
    await getRecords(req, res);
});

router.get("/view-records", async (req: Request, res: Response) => {
    await filterRecords(req, res);
})

router.post("/", createRecord);

router.put("/:id", async (req: Request, res: Response) => {
    await updateRecord(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
    await deleteRecord(req, res);
});


export default router;
