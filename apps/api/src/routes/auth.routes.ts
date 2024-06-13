import { Router } from "express";
import { login, refresh, register } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.get("/refresh", refresh);

export default authRoutes;

