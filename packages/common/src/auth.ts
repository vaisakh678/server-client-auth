import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
});

export const registerSchema = z
	.object({
		fullName: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(3),
		confirmPassword: z.string().min(3),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Conform password dosent match",
		path: ["confirmPassword"],
	});

export type User = z.infer<typeof loginSchema>;

