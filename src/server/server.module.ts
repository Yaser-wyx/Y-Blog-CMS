import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { userSchema } from "./schema/user.schema";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";


@Module({
					controllers: [ServerController],
					imports: [forwardRef(() => AuthModule), MongooseModule.forFeature([{ name: "user", schema: userSchema }])],
					providers: [ServerService],
					exports: [ServerService],
				})
export class ServerModule {

}
