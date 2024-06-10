// express.d.ts
import { IUserPayload } from "@repo/common/config";
import { Request } from "express";

declare module "express-serve-static-core" {
	interface Request {
		user?: IUserPayload;
	}
}

