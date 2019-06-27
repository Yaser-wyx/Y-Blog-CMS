import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { calculateWords, createObjectByKeys } from "../utils";
import { ArticleClassifyService } from "./articleClassify.service";
import { ArticleListDto } from "./dto/articleList.dto";
import { ArticleNearbyDto } from "./dto/articleNearby.dto";
import { CreateArticleInput } from "./input/createArticle.input";
import { PagesInput } from "./input/pages.input";
import { UpdateArticleInput } from "./input/updateArticle.input";
import { Article } from "./interface/article.interface";
import moment = require("moment");

@Injectable()
export class ArticleService {

	constructor(@InjectModel("Article") private readonly articleModel: Model<Article>, private readonly articleClassifyService: ArticleClassifyService) {
	}

	async findAll(page: PagesInput, classifyIndex?: number): Promise<ArticleListDto> {
		let classifyName = null;
		if (classifyIndex != -1) {//判断是否需要分类
			classifyName = await this.articleClassifyService.findArticleClassify();//读取所有的分类信息
			classifyName = classifyName[classifyIndex].typeName;//读取类别名
			console.log(classifyName);
		}
		let skip = (page.page - 1) * page.pageSize;//计算要跳过的记录数
		return await new Promise<ArticleListDto>(resolve => {
			let query = this.articleModel.find().skip(skip).limit(page.pageSize).sort("-updatedAt _id");//查找，按照updatedAt倒序返回
			let countQuery = this.articleModel.countDocuments();//计算指定类型的记录数
			if (classifyName != null) {//如果有类型信息则加上
				query.where({ classify: classifyName });//查找指定类型的文章
				countQuery = this.articleModel.countDocuments({ classify: classifyName });//计算指定类型文章的总记录数
			}
			return Promise.all([query.exec(), countQuery.exec()])//异步操作
				.then((res) => {
					let pageData = {//设置页面信息
						nowPage: page.page,//当前页
						total: res[1],//总记录数
						totalPages: Math.ceil(res[1] / page.pageSize),//总页数
					};
					resolve({ articleList: res[0], page: pageData });
				});
		});
	}

	async findById(articleId: String): Promise<Article> {
		let article = await this.articleModel.findById(articleId).exec();//根据id找文章
		this.articleModel.updateOne({ _id: articleId }, { views: article.views + 1 }).exec();
		return article;
	}

	async createArticles(newArticles: CreateArticleInput[]): Promise<Article[]> {//新建文章
		let newArticleList = [];
		newArticles.forEach(article => {
			const createdArticle = new this.articleModel(new Article(article));
			newArticleList.push(createdArticle.save());
		});
		return Promise.all(newArticleList);
	}

	async updateArticle(toBeUpdate: UpdateArticleInput): Promise<Article> {//更新文章
		let updatedArticle = createObjectByKeys(toBeUpdate, ["id"]);
		updatedArticle.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
		if (toBeUpdate.text != null) {
			updatedArticle.words = calculateWords(toBeUpdate.text);
		}
		await this.articleModel.findByIdAndUpdate(toBeUpdate.id, updatedArticle, { upsert: true }).exec();//更新文章
		let query = this.articleModel.findById(toBeUpdate.id);//查找更新完的文章信息 todo 可能可以去掉，看后台管理是否需要用到更新后的信息
		return await query.exec();
	}

	async deleteArticleByIds(articleIds: String[]) {
		let query = this.articleModel.deleteMany({ _id: { $in: articleIds } });//批量删除文章
		return await query.exec();
	}

	async findNearby(articleId: String): Promise<ArticleNearbyDto> {
		//todo 需要性能优化
		let articleList = await this.articleModel.find().sort("-updatedAt _id").exec();
		for (let i = 0; i < articleList.length; i++) {
			if (articleList[i]._id == articleId) {
				let articleNearby = { pre: null, next: null };
				if (i > 0) {
					articleNearby.pre = articleList[i - 1];
				}
				if (i + 1 < articleList.length) {
					articleNearby.next = articleList[i + 1];
				}
				console.log(articleNearby);
				return articleNearby;
			}
		}

	}
}
