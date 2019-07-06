import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ServerModule } from "../server/server.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Global()
@Module({
					imports: [PassportModule.register({ defaultStrategy: "jwt" }),
						JwtModule.register({ secret: "secretKey", signOptions: { expiresIn: "1d" } }),
						ServerModule,
					],
					providers: [AuthService, JwtStrategy],
					exports: [AuthService],
				})
export class AuthModule {

}
