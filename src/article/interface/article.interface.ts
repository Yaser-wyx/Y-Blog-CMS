import { Document } from "mongoose";
import { calculateWords } from "../../utils";
import { CreateArticleInput } from "../input/createArticle.input";


export interface ArticleInterface extends Document {
	title: String,
	_id: String,
	isPublish: boolean,
	words: Number,
	type: String,
	views: Number,
	text: String,
	createdAt: String,
	summary:String;
	updatedAt: String
}

export class Article implements ArticleInterface {
	createdAt: String;
	text: String;
	title: String;
	type: String;
	updatedAt: String;
	summary:String;
	views: Number;
	words: Number;
	isPublish: boolean;
	_id: String;


	constructor(article: CreateArticleInput) {
		this.isPublish = article.isPublish;
		this.text = article.text;
		this.words = calculateWords(article.text);
		this.title = article.title;
		this.type = article.type;
		this.views = 0;
		this.summary = article.summary
	}


}
