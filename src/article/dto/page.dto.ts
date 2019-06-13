import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class PageDto {
	@Field(() => Int)
	nowPage: number;
	@Field(() => Int)
	total: number;
	@Field(() => Int)
	totalPages: number;
}
