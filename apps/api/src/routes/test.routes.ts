import { Router } from "express";
import { test } from "../controllers/testController";

const testRoutes = Router();

testRoutes.get("/", test);

export default testRoutes;

