import { Field, ObjectType } from "type-graphql";
import { ArticleDto } from "./article.dto";
import { PageDto } from "./page.dto";

@ObjectType()
export class ArticleNearbyDto {
	@Field(() => ArticleDto, { nullable: true })
	pre?: ArticleDto;
	@Field(() => ArticleDto, { nullable: true })
	next?: ArticleDto;
}
