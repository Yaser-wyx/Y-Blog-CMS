import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleModule } from "./article/article.module";

@Module({
					imports: [
						ArticleModule,
						MongooseModule.forRootAsync({
																					useFactory: () => ({
																						uri: "mongodb://localhost/blog",
																						useNewUrlParser: true,
																					}),
																				}),
						GraphQLModule.forRoot({
																		autoSchemaFile: "schema.gql",
																		path: "/api",
																	})],
				})
export class ApplicationModule {}
