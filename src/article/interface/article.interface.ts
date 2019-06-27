import { Document } from "mongoose";
import { calculateWords } from "../../utils";
import { CreateArticleInput } from "../input/createArticle.input";

export class Article extends Document {
	createdAt: String;
	text: String;
	title: String;
	classify: String;
	updatedAt: String;
	summary: String;
	views: Number;
	words: Number;
	isPublish: boolean;


	constructor(article: CreateArticleInput) {
		super();
		this.isPublish = article.isPublish;
		this.text = article.text;
		this.words = calculateWords(article.text);
		this.title = article.title;
		this.classify = article.classify;
		this.views = 0;
		this.summary = article.summary;
	}


}
