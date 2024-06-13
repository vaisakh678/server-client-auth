export const WEB = "http://localhost:5173";
export const API = "http://localhost:3000/api/v1/";

export interface IUserPayload {
	fullName: string;
	userId: string;
	email: string;
}

export * from "./auth";

