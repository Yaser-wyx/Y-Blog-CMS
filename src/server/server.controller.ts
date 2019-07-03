import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { MyLogger } from "../myLogger";
import { UserDto } from "./dto/user.dto";
import { UserInput } from "./input/user.input";
import { ServerService } from "./server.service";

let multer = require("multer");

@Controller("api/server")
@ApiUseTags("server")
export class ServerController {

	constructor(private readonly serverService: ServerService) {}

	@Get("user")
	@ApiOperation({ title: "获取服务器用户", description: "读取当前服务器中的所有用户信息" })
	@ApiResponse({
								 status: 200,
								 description: "读取到的用户信息列表，可能为空",
								 type: [UserDto],
							 })
	async getServerUser(): Promise<UserDto[]> {
		return this.serverService.getUser();
	}

	@Post("user")
	@ApiOperation({ title: "创建新的服务器用户", description: "在当前服务器中创建新用户信息" })
	@ApiResponse({
								 status: 200,
								 description: "新创建的用户信息",
								 type: UserDto,
							 })
	async createUser(@Body()newUser: UserInput): Promise<UserDto> {
		return this.serverService.createUser(newUser);
	}

	@Get("test")
	@ApiOperation({ title: "连接测试", description: "用于测试服务器是否连接成功" })
	@ApiResponse({
								 status: 200,
								 description: "测试如果连接成功，则返回服务器上用户的个数",
								 type: Number,
							 })
	async testConnect(): Promise<object> {
		return this.serverService.countUser();
	}

	@Post("upload")
	@ApiOperation({ title: "上传用户头像", description: "上传用户的头像，并存储到服务器上" })
	@ApiResponse({
								 status: 200,
								 description: "存储在服务器上的地址信息",
								 type: String,
							 })
	@UseInterceptors(FileInterceptor("file", {
		storage: multer.diskStorage({
																	destination: "uploadFile",
																	filename: function(req, file, cb) {
																		cb(null, Date.now() + "-" + file.originalname);
																	},
																}),
	}))
	uploadFile(@UploadedFile() file) {
		console.log(file);
		return {
			url: file.filename,
		};
	}

	//todo 添加登录接口
	//todo 添加jwt协议
}
