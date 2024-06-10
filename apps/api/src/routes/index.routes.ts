import { Router } from "express";
import authRoutes from "./auth.routes";
import testRoutes from "./test.routes";

const index = Router();

index.use("/auth", authRoutes);
index.use("/test", testRoutes);

export default index;

