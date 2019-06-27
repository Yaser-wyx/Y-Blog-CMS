import { Field, ID,  ObjectType } from "type-graphql";

@ObjectType()
export class ArticleClassifyDto {
	@Field(() => ID)
	id: String;
	@Field()
	typeName: String;
	@Field()
	background: String;
}
