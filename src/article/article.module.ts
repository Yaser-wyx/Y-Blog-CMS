import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleResolver } from "./article.resolver";
import { ArticleService } from "./article.service";
import { ArticleClassifyResolver } from "./articleClassify.resolver";
import { ArticleClassifyService } from "./articleClassify.service";
import { articleSchema } from "./schema/article.schema";
import { articleClassifySchema } from "./schema/classify.schema";

@Module({
					imports: [MongooseModule.forFeature([{ name: "Classify", schema: articleClassifySchema }, {
						name: "Article",
						schema: articleSchema,
					}])],
					providers: [ArticleClassifyResolver, ArticleResolver, ArticleService, ArticleClassifyService],
				})
export class ArticleModule {

}
