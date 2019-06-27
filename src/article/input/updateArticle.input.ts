import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateArticleInput {
	@Field(() => ID)
	readonly id: String;
	@Field({ nullable: true })
	readonly title: String;
	@Field({ nullable: true })
	readonly classify: String;
	@Field({ nullable: true })
	readonly text: String;
	@Field()
	readonly isPublish: boolean;
	@Field({ nullable: true })
	readonly summary: String;
}
