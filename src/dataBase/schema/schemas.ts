import { articleSchema } from "./article.schema";
import { articleClassifySchema } from "./classify.schema";
import { storageSchema } from "./storage.schema";

export const ARTICLE_SCHEMA = "article";
export const CLASSIFY_SCHEMA = "classify";
export const STORAGE_SCHEMA = "storage";

export const schemas = {
	[ARTICLE_SCHEMA]: articleSchema,
	[CLASSIFY_SCHEMA]: articleClassifySchema,
	[STORAGE_SCHEMA]: storageSchema,
};
