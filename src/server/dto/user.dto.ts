import { ApiModelProperty } from "@nestjs/swagger";
import { User } from "../interface/user.interface";

let _ = require("lodash");

export class UserDto {
	@ApiModelProperty({ description: "用户名", required: false })
	userName?: String;
	@ApiModelProperty({ description: "用户头像", required: false })
	avatar?: String;
	@ApiModelProperty({ description: "用户邮箱", required: false })
	email?: String;
	@ApiModelProperty({ description: "用户ID", required: false })
	userId?: String;

	constructor(user: User) {
		if (!!user) {
			this.avatar = user.avatar;
			this.userName = user.userName;
			this.email = user.email;
			this.userId = user._id;
		}
	}
}
