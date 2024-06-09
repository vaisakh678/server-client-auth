import express from "express";
import { API } from "@repo/common/config";

const app = express();

app.get("/", (req, res) => {
	return res.send("hello world" + " " + API);
});

app.listen(3000, () => {
	console.log("server is up🚀");
});

