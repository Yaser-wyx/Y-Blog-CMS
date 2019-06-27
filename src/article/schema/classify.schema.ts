import * as mongoose from "mongoose";

const schema = mongoose.Schema;
export const articleClassifySchema = new schema
({
	 typeName: String,
	 background: String,
 });

