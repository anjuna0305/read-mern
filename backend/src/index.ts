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
const PORT = process.env.PORT || 5000;
const mongo_url = process.env.MONGO_URL ? process.env.MONGO_URL : ""
mongoose
  .connect(mongo_url)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
