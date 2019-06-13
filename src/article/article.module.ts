import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleResolver } from "./article.resolver";
import { ArticleService } from "./article.service";
import { articleSchema } from "./schema/article.schema";

@Module({
					imports:[MongooseModule.forFeature([{ name: 'Article', schema: articleSchema }])],
					providers: [ArticleResolver,ArticleService],
				})
export class ArticleModule {

}
