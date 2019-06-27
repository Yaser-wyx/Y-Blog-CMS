import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ArticleDto {
	@Field(() => ID)
	id: String;
	@Field()
	title: String;
	@Field(() => Int)
	words: Number;
	@Field()
	classify: String;
	@Field(() => Int)
	views: Number;
	@Field()
	text: String;
	@Field()
	createdAt: String;
	@Field()
	updatedAt: String;
	@Field()
	summary: String;
}
