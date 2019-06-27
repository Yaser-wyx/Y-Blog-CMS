import { User } from "../interface/user.interface";

let _ = require("lodash");

export class UserDto {
	userName: String;
	avatar: String;
	email: String;
	userId: String;

	constructor(user: User) {
		if (!!user) {
			this.avatar = user.avatar;
			this.userName = user.userName;
			this.email = user.email;
			this.userId = user._id;
		}
	}
}
