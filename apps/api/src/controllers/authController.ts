import { Request, Response } from "express";
import IResponseType from "@repo/interfaces/responseType";
import User from "../models/User";
import sha256 from "../utils/sha256";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import md5 from "../utils/md5";
import { IUserPayload, loginSchema, registerSchema } from "@repo/common/config";
import { ZodError } from "zod";

export const login = async (req: Request, res: Response): Promise<Response<IResponseType>> => {
	try {
		const { email, password } = loginSchema.parse(req.body);
		const user = await User.findOne({ email, password: sha256(password) });
		if (!user)
			return res.json({
				status: false,
				message: { error: "Invalid credentials!." },
			});
		const playload = {
			userId: user._id,
			email: user.email,
			fullName: user.fullName,
		};
		const accessToken = jwt.sign(playload, "fjsdljfdksjflsdf", { expiresIn: "30s" });
		const refreshToken = jwt.sign(playload, "jfoidjsifjosjgh", { expiresIn: "60s" });
		user.lastLoggedIn = new Date();
		user.refreshToken = md5(refreshToken);
		await user.save();
		const cookieOptions = {
			httpOnly: true,
			path: "/api/v1/auth/refresh",
			secure: true,
			sameSite: true,
		};
		return res
			.status(200)
			.cookie("refreshToken", refreshToken, cookieOptions)
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
		const refreshToken = req.cookies["refreshToken"];
		const userDecode = jwt.verify(refreshToken, "jfoidjsifjosjgh") as IUserPayload;
		if (!userDecode)
			return res.status(403).json({
				status: false,
				message: { message: "Token is not valid!." },
			});
		const user = await User.findOne({ _id: userDecode.userId, refreshToken: md5(refreshToken) });
		if (!user) {
			return res.status(403).json({
				status: false,
				message: { errorMessage: "Failed to authenticate!." },
			});
		}
		const playload = {
			userId: user._id,
			email: user.email,
			fullName: user.fullName,
		};
		const accessToken = jwt.sign(playload, "fjsdljfdksjflsdf", { expiresIn: "30s" });
		return res.json({
			status: true,
			data: { accessToken: accessToken },
			message: { message: "Authenticated" },
		});
	} catch (error) {
		if (error instanceof TokenExpiredError)
			return res.status(403).json({
				status: false,
				message: { error: "Invalid token!." },
			});
		return res.json({
			status: false,
			message: { error: "Something went wrong!." },
		});
	}
};

