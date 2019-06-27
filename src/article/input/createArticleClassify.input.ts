import { Field, InputType } from "type-graphql";

@InputType()
export class CreateArticleClassifyInput {
	@Field()
	readonly typeName: String;
	@Field()
	readonly background: String;
}
