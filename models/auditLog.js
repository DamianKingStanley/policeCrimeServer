import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., "register", "login", "create", "update"
  recordId: { type: mongoose.Schema.Types.ObjectId, ref: "Record" }, // Optional, only for record-related actions
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  changes: { type: Object }, // Optional, details of the changes made
});

export default mongoose.model("AuditLog", auditLogSchema);
