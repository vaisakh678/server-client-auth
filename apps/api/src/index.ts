import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { API } from "@repo/common/config";
import indexRoutes from "./routes/index.routes";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", indexRoutes);

app.get("/", (req, res) => {
	return res.send("hello world" + " " + API);
});

app.listen(3000, () => {
	console.log("server is up🚀");
});

