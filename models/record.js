import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    crimes: [
      {
        type: { type: String, required: true },
        date: { type: Date, required: true },
        status: { type: String, required: true },
      },
    ],
    status: [{ type: String, required: true }],
    photos: [{ type: String, required: true }], // URL or path to the photo
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Record", recordSchema);
