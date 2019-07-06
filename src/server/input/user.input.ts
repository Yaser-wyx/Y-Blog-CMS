import { ApiModelProperty } from "@nestjs/swagger";

export class UserInput {
	@ApiModelProperty({ description: "创建的用户名", required: false })
	readonly userName?: String;
	@ApiModelProperty({ description: "用户头像地址", required: false })
	readonly avatar?: String;
	@ApiModelProperty({ description: "用户邮箱", required: false })
	readonly email?: String;
	@ApiModelProperty({ description: "用户密码", required: false })
	readonly password?: String;
	@ApiModelProperty({ description: "用户id", required: false })
	readonly userId?: String;
}
