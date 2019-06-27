import { Document } from "mongoose";


export class ArticleClassify extends Document {
	typeName: String;
	background: String;
}
