import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./schema/user.schema";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";


@Module({
					controllers: [ServerController],
					imports: [MongooseModule.forFeature([{ name: "user", schema: userSchema }])],
					providers: [ServerService],
				})
export class ServerModule {

}
