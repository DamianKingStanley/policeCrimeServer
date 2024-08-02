import AuditLog from "../models/auditLog.js";

export const getAllActivities = async (req, res) => {
  try {
    const activities = await AuditLog.find()
      .sort({ timestamp: -1 })
      .populate("recordId")
      .populate("userId");

    if (activities.length === 0) {
      return res.status(404).json({ message: "No activities found" });
    }

    console.log(activities);

    res.status(200).json(activities);
  } catch (err) {
    console.error("Error fetching activities:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
