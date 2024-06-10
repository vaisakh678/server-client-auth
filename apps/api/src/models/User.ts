import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
	fullName: string;
	email: string;
	password: string;
	refreshToken: string;
	lastLoggedIn: Date;
	isActive: boolean;
}

const user = new Schema<IUser>(
	{
		fullName: { type: String, trim: true, required: true },
		email: { type: String, trim: true, required: true, unique: true },
		password: { type: String, required: true },
		refreshToken: { type: String },
		lastLoggedIn: { type: Date, default: null },
		isActive: { type: Boolean, default: true },
	},
	{ versionKey: false, timestamps: true }
);

export default model<IUser>("user", user);

