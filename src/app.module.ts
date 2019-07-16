import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";
import { DbModule } from "./dataBase/db.module";
import { ServerModule } from "./server/server.module";

@Module({
					imports: [
						ArticleModule, ServerModule, AuthModule, DbModule,
						MongooseModule.forRootAsync({
																					useFactory: () => ({
																						uri: "mongodb://localhost/blog",
																						useNewUrlParser: true,
																					}),
																				}),
						GraphQLModule.forRoot({
																		autoSchemaFile: "schema.gql",
																		path: "/Graphql/api",
																	})],
				})
export class ApplicationModule {}
