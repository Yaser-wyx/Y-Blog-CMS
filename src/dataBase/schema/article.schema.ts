import * as moment from "moment";
import * as mongoose from "mongoose";
//文章列表，所有的文章都保存在该表中
const schema = mongoose.Schema;
export const articleSchema = new schema(
	{
		title: String,
		words: Number,
		text: String,
		isPublish: Boolean,
		summary: String,
		createdAt: {
			type: String,
			default: moment().format("YYYY-MM-DD HH:mm:ss"),
		},
		updatedAt: {
			type: String,
			default: moment().format("YYYY-MM-DD HH:mm:ss"),
		},
	});
articleSchema.pre("save", function(next) {

	let time = moment().format("YYYY-MM-DD HH:mm:ss");
	if (this.isNew) {
		this.createdAt = this.updatedAt = time;
	} else {
		this.updatedAt = time;
	}
	next();
});
