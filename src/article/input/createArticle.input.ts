import { Field, InputType } from "type-graphql";

@InputType()
export class CreateArticleInput {
	@Field()
	readonly title: String;
	@Field({ nullable: true })
	readonly classify: String;
	@Field()
	readonly text: String;
	@Field()
	readonly isPublish: boolean;
	@Field()
	readonly summary: String;
}
