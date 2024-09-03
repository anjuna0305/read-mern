import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import authRoutes from "./routes/sampleRoute";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* ROUTES */
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */

const username = process.env.DB_USERNAME || "admin";
const passwd = process.env.DB_PASSWORD || "1234567890";


const PORT = process.env.PORT || 5000;
const CONNECTION_url = `mongodb+srv://${username}:${passwd}@cluster0.tfcjplj.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(CONNECTION_url)
    .then(() => console.log("connection is established and running"))
    .catch((err) => console.log(err.message));

app.listen(process.env.PORT || 3001, () =>
    console.log("server started on port 5173")
);
