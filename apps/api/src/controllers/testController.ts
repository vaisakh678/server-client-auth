import IResponseType from "@repo/interfaces/responseType";
import { Request, Response } from "express";

export const test = async (_: Request, res: Response): Promise<Response<IResponseType>> => {
	try {
		// await new Promise((res) => {
		// 	setTimeout(res, Math.random() * 100);
		// });
		return res.json({
			status: true,
			message: { message: "Successfully hit this api" },
		});
	} catch (error) {
		return res.json({
			status: false,
			message: { error: "Something went wrong!." },
		});
	}
};

