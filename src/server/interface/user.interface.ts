import { Document } from "mongoose";

export class User extends Document {
	userName: String;
	password: String;
	avatar: String;
	email: String;
	_id:String
}
