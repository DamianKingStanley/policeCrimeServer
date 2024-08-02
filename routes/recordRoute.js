import express from "express";
import auth from "../middleware/auth.js";
import upload from "../multer.js";
import {
    getAllRecords,
    createRecord,
    getASingleRecord,
    searchRecordsByName,
    updateARecord,
    deleteARecord,
    advancedSearchRecords,
} from "../controllers/recordController.js";

const router = express.Router();

router.get("/get-all-record", auth(["admin", "officer"]), getAllRecords);
router.post(
    "/create-record",
    auth(["admin"]),
    upload.array("photos", 4),
    createRecord
);
router.get("/:id", auth(["admin", "officer"]), getASingleRecord);
router.get("/record/search", auth(["admin", "officer"]), searchRecordsByName);
router.patch("/record/:id", auth(["admin"]), updateARecord);
router.delete("/:id", auth(["admin"]), deleteARecord);
router.get('/record/advanced-search', auth(['admin', 'officer']), advancedSearchRecords);

export default router;