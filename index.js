import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import recordRoute from "./routes/recordRoute.js";
import auditRoute from "./routes/auditRoute.js"; // Import the audit route
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
    .connect(MONGODB_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    )
    .catch((error) => console.error("Failed to connect to MongoDB:", error));

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

// Serve static files
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", userRoute);
app.use("/", recordRoute);
app.use("/", auditRoute); // Use the audit route