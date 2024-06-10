export const WEB = "http://localhost:5173";
export const API = "http://localhost:3000";

export interface IUserPayload {
	fullName: string;
	userId: string;
	email: string;
}

export * from "./auth";

