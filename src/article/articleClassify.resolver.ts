import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ArticleClassifyService } from "./articleClassify.service";
import { ArticleClassifyDto } from "./dto/articleClassify.dto";

import { CreateArticleClassifyInput } from "./input/createArticleClassify.input";


@Resolver()
export class ArticleClassifyResolver {

	constructor(private readonly articleClassifyService: ArticleClassifyService) {
	}

	@Mutation(() => [ArticleClassifyDto])
	public async createArticleClassifies
	(@Args({ name: "articleClassifies", type: () => [CreateArticleClassifyInput] })
		 newArticleClassifies: [CreateArticleClassifyInput]) {
		return this.articleClassifyService.createArticleClassify(newArticleClassifies);
	}
}
