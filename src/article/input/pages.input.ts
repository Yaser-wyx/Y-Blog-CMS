import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PagesInput {
	@Field(() => Int)
	readonly page: number;
	@Field(() => Int, { nullable: true, defaultValue: 10 })
	readonly pageSize?: number;
}
