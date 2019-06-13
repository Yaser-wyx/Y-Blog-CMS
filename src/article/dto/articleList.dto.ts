import { Field, ObjectType } from "type-graphql";
import { ArticleDto } from "./article.dto";
import { PageDto } from "./page.dto";

@ObjectType()
export class ArticleListDto {
	@Field(() => [ArticleDto], { nullable: true })
	articleList: ArticleDto[];
	@Field(() => PageDto, { nullable: true })
	page: PageDto;
}
