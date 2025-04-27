import express, { Request, Response } from "express";
import { createRecord, deleteRecord, getRecords, updateRecord, testRoute } from "../controllers/record.controller";

// define all API endpoints/ routes
const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    await testRoute(req, res);
});

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
    await getRecords(req, res);
});

router.post("/", createRecord);

router.put("/:id", async (req: Request, res: Response) => {
    await updateRecord(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
    await deleteRecord(req, res);
});


export default router;
