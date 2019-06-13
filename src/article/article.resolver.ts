import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./dto/article.dto";
import { ArticleListDto } from "./dto/articleList.dto";
import { CreateArticleInput } from "./input/createArticle.input";
import { PagesInput } from "./input/pages.input";
import { UpdateArticleInput } from "./input/updateArticle.input";

@Resolver()
export class ArticleResolver {

	constructor(private readonly articleService: ArticleService) {
	}

	@Query(() => ArticleListDto, { nullable: true })
	public async articles(@Args("page") page: PagesInput) {
		return this.articleService.findAll(page);
	}

	@Mutation(() => ArticleDto)
	public async createArticle(@Args("article")newArticle: CreateArticleInput) {
		return this.articleService.createArticle(newArticle);
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
