import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(private readonly authService: AuthService) {
		super({
						jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
						secretOrKey: "secretKey",
					});
	}

	async validate(payload: JwtPayload) {
		const user = await this.authService.validate(payload);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
