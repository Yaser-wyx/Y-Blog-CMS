import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { UserInput } from "./input/user.input";
import { User } from "./interface/user.interface";

let _ = require("lodash");

//先仅支持单用户模式
@Injectable()
export class ServerService {

	constructor(@InjectModel("user") private readonly userModel: Model<User>) { }

	async getUser(): Promise<UserDto> {
		let users = await this.userModel.find();//获取所有的用户信息
		console.log(users);
		return new UserDto(users[0]);
	}

	async createUser(user: UserInput): Promise<UserDto> {
		//每次创建新用户前，都清空表
		await this.deleteUser();
		console.log(user);
		let newUser = new this.userModel(user);
		let result = await newUser.save();
		return new UserDto(result);
	}

	async deleteUser(userId?: String) {
		let deleteObj = {};
		if (userId != null) {
			deleteObj = { _id: userId };
		}
		await this.userModel.deleteMany(deleteObj).exec();
	}
}
