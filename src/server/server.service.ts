import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "../auth/auth.service";
import { FAILURE, SUCCESS } from "../utils/Constant";
import { UserDto } from "./dto/user.dto";
import { UserInput } from "./input/user.input";
import { User } from "./interface/user.interface";

let _ = require("lodash");
let fs = require("fs");

//先仅支持单用户模式
@Injectable()
export class ServerService {

	constructor(@InjectModel("user") private readonly userModel: Model<User>, @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) { }

	async getUser(): Promise<UserDto[]> {
		let users = await this.userModel.find();//获取所有的用户信息
		let userDtos = [];
		users.forEach(user => {
			userDtos.push(new UserDto(user));
		});
		return userDtos;
	}

	async countUser(): Promise<object> {
		return {
			userCount: await this.userModel.count().exec(),
		};
	}

	async userLogin(user: UserInput) {
		let userInDB = await this.userModel.findById(user.userId).exec();//查找数据库中指定的用户信息
		console.log(user);
		if (userInDB === null) {
			return { code: FAILURE, msg: "用户不存在!" };
		}
		if (userInDB.password === user.password) {
			//创建用户的token
			let accessToken = await this.authService.createToken(userInDB);
			return { code: SUCCESS, data: { token: accessToken, user: new UserDto(userInDB) } };
		} else {
			return { code: FAILURE, msg: "用户密码错误!" };
		}
	}

	async createUser(user: UserInput): Promise<UserDto> {
		//todo 检查用户名是否存在
		console.log(user);
		let newUser = new this.userModel(user);
		let result = await newUser.save();
		return new UserDto(result);//返回创建的用户信息
	}

	async deleteUser(userId?: String) {
		let deleteObj = {};
		if (userId != null) {
			deleteObj = { _id: userId };
		}
		await this.userModel.deleteMany(deleteObj).exec();
	}

	async findUserByID(userId: String) {
		return await this.userModel.findById(userId).exec();
	}
}
