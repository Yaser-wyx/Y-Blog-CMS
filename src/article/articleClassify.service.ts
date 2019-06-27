import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateArticleClassifyInput } from "./input/createArticleClassify.input";
import { ArticleClassify } from "./interface/classify.interface";

@Injectable()
export class ArticleClassifyService {

	constructor(@InjectModel("Classify") private readonly classifyModel: Model<ArticleClassify>) {
	}

	async findArticleClassify(classifyId?: String): Promise<ArticleClassify[]> {//根据类别id查找类型信息或返回全部信息
		let query = this.classifyModel.find();
		if (classifyId != null) {
			query = this.classifyModel.findById(classifyId);
		}
		return await query.exec();
	}

	async createArticleClassify(newArticleClassifies: CreateArticleClassifyInput[]): Promise<ArticleClassify[]> {//批量新建文章类别信息
		return await this.classifyModel.create(newArticleClassifies);
	}

}
