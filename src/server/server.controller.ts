import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserInput } from "./input/user.input";
import { ServerService } from "./server.service";

@Controller("api/server")
export class ServerController {

	constructor(private readonly serverService: ServerService) {}

	@Get("user")
	async getServerUser(): Promise<UserDto> {
		return this.serverService.getUser();
	}

	@Post("user")
	async createUser(@Body()newUser: UserInput) {
		return this.serverService.createUser(newUser);
	}

	@Get("test")
	async testConnect() {
		return true;
	}
}
