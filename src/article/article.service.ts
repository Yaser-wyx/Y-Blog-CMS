import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { calculateWords, createObjectByKeys } from "../utils";
import { ArticleListDto } from "./dto/articleList.dto";
import { CreateArticleInput } from "./input/createArticle.input";
import { PagesInput } from "./input/pages.input";
import { UpdateArticleInput } from "./input/updateArticle.input";
import { Article } from "./interface/article.interface";
import { Model } from "mongoose";
import moment = require("moment");

@Injectable()
export class ArticleService {

	constructor(@InjectModel("Article") private readonly articleModel: Model<Article>) {
	}

	async findAll(page: PagesInput): Promise<ArticleListDto> {
		let skip = (page.page - 1) * page.pageSize;
		return await new Promise<ArticleListDto>(resolve => {
			return Promise.all([this.articleModel.find().skip(skip).limit(page.pageSize).sort("-updatedAt").exec(), this.articleModel.count().exec()])
				.then((res) => {
					let pageData = {
						nowPage: page.page,
						total: res[1],
						totalPages: Math.ceil(res[1] / page.pageSize),
					};
					resolve({ articleList: res[0], page: pageData });
				});
		});
	}

	async createArticle(newArticle: CreateArticleInput): Promise<Article> {//新建文章
		const createdArticle = new this.articleModel(new Article(newArticle));
		return await createdArticle.save();
	}

	async updateArticle(toBeUpdate: UpdateArticleInput): Promise<Article> {//更新文章
		let updatedArticle = createObjectByKeys(toBeUpdate, ["id"]);
		updatedArticle.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
		if (toBeUpdate.text != null) {
			updatedArticle.words = calculateWords(toBeUpdate.text);
		}
		await this.articleModel.findByIdAndUpdate(toBeUpdate.id, updatedArticle, { upsert: true }).exec();
		let query = this.articleModel.findById(toBeUpdate.id);
		return await query.exec();
	}

	async deleteArticleByIds(articleIds: String[]) {
		let query = this.articleModel.deleteMany({ _id: { $in: articleIds } });
		return await query.exec();
	}

}
