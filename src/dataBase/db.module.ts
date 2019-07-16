import { forwardRef, Global, Module } from "@nestjs/common";
import { DbService } from "./db.service";

//数据库管理模块
@Global()
@Module({
					providers: [DbService],
					exports: [DbService],
				})
export class DbModule {

}
