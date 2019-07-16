/**仓库表
 * 保存有以下信息
 * 1.仓库名字
 *
 */
import * as mongoose from "mongoose";
//仓库表
const schema = mongoose.Schema;
export const storageSchema = new schema
({
	 storageName: String,//仓库名字
	 storagePath: String,//仓库存储路径
	 isAutoSync: Boolean,//是否自动同步
	 storageInfo: Object,//仓库信息
	 password: String,//仓库密码(可选)
	 storageList: Object,//仓库文件目录列表信息
 });

