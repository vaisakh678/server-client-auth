import { IUserPayload } from "@repo/common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = (req.headers?.accessToken as string).split(" ").pop();
		const decode = jwt.verify(token as string, "fjsdljfdksjflsdf") as IUserPayload;
		if (decode) {
			req.user = decode as IUserPayload;
			next();
		}
		return res.status(401).json({ error: "Authorization failed!." });
	} catch (error) {
		return res.status(401).json({ error: "Authorization failed!." });
	}
};

export default auth;

