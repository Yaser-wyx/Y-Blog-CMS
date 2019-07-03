import { ApiModelProperty } from "@nestjs/swagger";

export class UserInput {
	@ApiModelProperty({description:"创建的用户名"})
	readonly userName: String;
	@ApiModelProperty({description:"用户头像地址"})
	readonly avatar: String;
	@ApiModelProperty({description:"用户邮箱"})
	readonly email: String;
	@ApiModelProperty({description:"用户密码"})
	readonly password: String;
}
