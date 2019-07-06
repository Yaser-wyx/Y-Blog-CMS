import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInput } from "../server/input/user.input";
import { ServerService } from "../server/server.service";
import { JwtPayload } from "./interface/jwt-payload.interface";

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, @Inject(forwardRef(() => ServerService)) private readonly serverService: ServerService) {}

	async createToken(user: UserInput) {
		console.log("createToken", user);
		let accessToken;
		try {
			const jwtUser: JwtPayload = { email: user.email, userId: user.userId, userName: user.userName };
			accessToken = await this.jwtService.signAsync(jwtUser, { algorithm: "HS384", expiresIn: "1d" });
		} catch (e) {
			console.log(e);
		}
		return { accessToken: accessToken };
	}

	async validate(userPayload: JwtPayload) {
		return await this.serverService.findUserByID(userPayload.userId);
	}
}
