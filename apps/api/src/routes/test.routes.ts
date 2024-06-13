import { Router } from "express";
import { test } from "../controllers/testController";
import auth from "../middlewares/auth.middleware";

const testRoutes = Router();

testRoutes.get("/", auth, test);

export default testRoutes;

