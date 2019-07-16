import { Injectable } from "@nestjs/common";
import { DB_BASE } from "./dbConfig";
import { schemas } from "./schema/schemas";

let _ = require("lodash");
let mongoose = require("mongoose");

//管理多用户数据库模块
@Injectable()
export class DbService {
	private userDBs = {};//用户数据库
	private userModels = {};//用户model
	createConnectionByUserName(userName) {
		let uri = `${DB_BASE}${userName}`;
		let db = mongoose.createConnection(uri);
		db.on("connected", () => {
			console.log(`${uri} 数据库连接成功`);
		});
		db.on("error", () => {
			console.log(`${uri} 数据库连接成功`);
		});
		return db;
	}

	getConnectionByUserName(userName) {
		if (this.userDBs.hasOwnProperty(userName)) {
			return this.userDBs[userName];
		} else {
			let db = this.createConnectionByUserName(userName);
			this.userDBs[userName] = db;
			return db;
		}
	}

	generateModelByUserName(userName, schemaName) {
		//生成对应数据库下的所有model实例
		let db = this.getConnectionByUserName(userName);
		let model = db.model(schemaName, schemas[schemaName]);
		this.userModels[userName][schemaName] = model;
		return model;
	}

	getModelByUserNameAndSchemaName(userName, schemaName) {
		if (this.userModels.hasOwnProperty(userName)) {
			//存在该用户的model
			if (this.userModels[userName].hasOwnProperty(schemaName)) {
				//该用户有指定的model
				return this.userModels[userName][schemaName];
			}
		} else {
			this.userModels[userName] = {};
		}
		return this.generateModelByUserName(userName, schemaName);
	}
}
