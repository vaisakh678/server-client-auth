import { IUserPayload } from "@repo/common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = ((req.headers?.authorization as string) ?? (req.headers?.Authorization as string))?.split(" ")?.pop();
		if (!token) return res.status(401).json({ error: "Token not found!." });
		const decode = jwt.verify(token as string, "fjsdljfdksjflsdf") as IUserPayload;
		if (decode) {
			req.user = decode as IUserPayload;
			return next();
		}
		return res.status(401).json({ error: "Authorization failed!." });
	} catch (error) {
		console.log(error);
		if (error instanceof TokenExpiredError) {
			return res.status(401).json({ error: "Authorization failed!." });
		}
		return res.status(401).json({ error: "Something went wrong!." });
	}
};

export default auth;

