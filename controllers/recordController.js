import Record from "../models/record.js";
import multer from "multer";
import AuditLog from "../models/auditLog.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const createRecord = async (req, res) => {
  try {
    const { name, crimes, status } = req.body;
    const photos = req.files ? req.files.map((file) => file.path) : [];

    const record = new Record({
      name,
      crimes: JSON.parse(crimes),
      status: JSON.parse(status),
      photos,
    });

    const newRecord = await record.save();

    // Log the creation action
    const auditLog = new AuditLog({
      action: "create",
      recordId: newRecord._id,
      userId: req.user.id,
      changes: newRecord,
    });
    await auditLog.save();

    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const searchRecordsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const records = await Record.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (records.length === 0) {
      return res.status(404).json({ message: "No records found." });
    }

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getASingleRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (record == null) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateARecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Log the update action
    const auditLog = new AuditLog({
      action: "update",
      recordId: updatedRecord._id,
      userId: req.user.id,
      changes: req.body,
    });

    await auditLog.save();

    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteARecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Log the delete action
    const auditLog = new AuditLog({
      action: "delete",
      recordId: record._id,
      userId: req.user.id,
      changes: {}, // No specific changes to log for a delete action
    });
    await auditLog.save();

    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const advancedSearchRecords = async (req, res) => {
  try {
    const { crimeType, startDate, endDate, status } = req.query;

    let query = {};

    if (crimeType) {
      query["crimes.type"] = crimeType;
    }

    if (startDate && endDate) {
      query["crimes.date"] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      query["crimes.date"] = { $gte: new Date(startDate) };
    } else if (endDate) {
      query["crimes.date"] = { $lte: new Date(endDate) };
    }

    if (status) {
      query.status = status;
    }

    const records = await Record.find(query);
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
