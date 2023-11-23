import express from "express";
import ReportController from "../controllers/report.controller.js";
import checkDuplicatedReport from "../middlewares/checkDuplicatedReport.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", ReportController.getReport);

router.post("/", checkDuplicatedReport, ReportController.createReport);

router.put("/:id", authMiddleware, ReportController.updateReport);

router.delete("/:id", authMiddleware, ReportController.deleteReport);

export default router;
