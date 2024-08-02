import express from "express";
import { getAllActivities } from "../controllers/auditController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/get-activities", auth(["admin"]), getAllActivities);

export default router;
