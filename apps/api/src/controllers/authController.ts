import { Request, Response } from "express";
import IResponseType from "@repo/interfaces/responseType";
import User from "../models/User";
import sha256 from "../utils/sha256";
import jwt from "jsonwebtoken";
import md5 from "../utils/md5";
import { loginSchema, registerSchema } from "@repo/common/config";
import { ZodError } from "zod";

export const login = async (req: Request, res: Response): Promise<Response<IResponseType>> => {
	try {
		const { email, password } = loginSchema.parse(req.body);
		const user = await User.findOne({ email, password: sha256(password) });
		if (!user)
			return res.json({
				status: false,
				errorMessage: { message: "Invalid credentials!." },
			});
		const playload = {
			userId: user._id,
			email: user.email,
			fullName: user.fullName,
		};
		const accessToken = jwt.sign(playload, "fjsdljfdksjflsdf");
		const refreshToken = jwt.sign(playload, "jfoidjsifjosjgh");
		user.lastLoggedIn = new Date();
		user.refreshToken = md5(refreshToken);
		const cookieOptions = {
			httpOnly: true,
			path: "/auth/refresh",
			secure: true,
			sameSite: true,
		};
		return res
			.status(200)
			.cookie("auth", { refreshToken }, cookieOptions)
			.json({
				status: true,
				message: { message: "Successfully logged in!." },
				data: { accessToken },
			});
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError)
			return res.status(417).json({
				status: false,
				error: error.errors,
				message: { error: "Validation error!." },
			});
		return res.status(417).json({
			status: false,
			message: { error: "Something went wrong!." },
		});
	}
};

export const register = async (req: Request, res: Response): Promise<Response<IResponseType>> => {
	try {
		const { fullName, email, password } = registerSchema.parse(req.body);
		if (await User.exists({ email }))
			return res.json({
				status: false,
				message: { errorMessage: "User already exists!." },
			});
		const user = await User.create({ fullName: fullName, email: email, password: sha256(password) });
		if (user)
			return res.status(201).json({
				status: true,
				message: { message: "User created successfully" },
			});
		return res.json({
			status: false,
			message: { errorMessage: "Failed to create user" },
		});
	} catch (error) {
		return res.json({
			status: false,
			message: { errorMessage: "Failed to create user" },
		});
	}
};

export const refresh = async (req: Request, res: Response): Promise<Response<IResponseType>> => {
	try {
		console.log("hello");
		const cookieValue = req.cookies["accessToken"];
		const user = jwt.decode(cookieValue);
		if (!user)
			return res.status(403).json({
				status: false,
				message: { message: "Token not found!" },
			});
		return res.json({
			status: false,
			message: { errorMessage: "Failed to authenticate!." },
		});
	} catch (error) {
		if (error instanceof ZodError)
			return res.status(417).json({
				status: false,
				error: error.errors,
				message: { error: "Validation error!." },
			});
		return res.json({
			status: false,
			message: { errorMessage: "Something went wrong!." },
		});
	}
};

