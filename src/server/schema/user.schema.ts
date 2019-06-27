import * as mongoose from "mongoose";

const schema = mongoose.Schema;
export const userSchema = new schema(
	{
		userName: String,
		password: String,
		avatar: String,
		email: String,
	});

