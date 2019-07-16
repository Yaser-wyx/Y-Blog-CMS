import * as mongoose from "mongoose";
//类别表
const schema = mongoose.Schema;
export const articleClassifySchema = new schema
({
	 typeName: String,
	 background: String,
 });

