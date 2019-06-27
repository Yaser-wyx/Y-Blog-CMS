import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Int } from "type-graphql";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./dto/article.dto";
import { ArticleListDto } from "./dto/articleList.dto";
import { ArticleNearbyDto } from "./dto/articleNearby.dto";
import { CreateArticleInput } from "./input/createArticle.input";
import { PagesInput } from "./input/pages.input";
import { UpdateArticleInput } from "./input/updateArticle.input";

@Resolver()
export class ArticleResolver {

	constructor(private readonly articleService: ArticleService) {
	}

	@Query(() => ArticleListDto, { nullable: true })
	public async articles(
		@Args("page") page: PagesInput,
		@Args({
						name: "classifyIndex",
						type: () => Int,
						nullable: true, defaultValue: -1,
					})
			classifyIndex?: number,
	) {
		return this.articleService.findAll(page, classifyIndex);
	}

	@Query(() => ArticleDto)
	public async article(@Args("articleId") articleId: String) {
		console.log(articleId);
		return this.articleService.findById(articleId);
	}

	@Query(() => ArticleNearbyDto)
	public async articleNearby(@Args("articleId") articleId: String) {
		return this.articleService.findNearby(articleId);
	}

	@Mutation(() => [ArticleDto])
	public async createArticle
	(@Args({ name: "article", type: () => [CreateArticleInput] })newArticle: [CreateArticleInput]) {
		return this.articleService.createArticles(newArticle);
	}

	@Mutation(() => ArticleDto)
	public async updateArticle(@Args("article")updateArticle: UpdateArticleInput) {
		return this.articleService.updateArticle(updateArticle);
	}

	@Query(() => Boolean, { nullable: true })
	public deleteArticleByIDs(@Args({ name: "articleIds", type: () => [String] })articleIds: String[]) {
		return this.articleService.deleteArticleByIds(articleIds).then(res => {
			return !!res.ok;
		});
	}
}
