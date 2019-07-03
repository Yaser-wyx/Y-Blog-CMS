import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as path from "path";
import { ApplicationModule } from "./app.module";
import { MyLogger } from "./myLogger";
import * as helmet from "helmet";
import * as serveStatic from "serve-static";

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule, {
		logger: new MyLogger(),//设置日志
	});
	//api文档
	const ApiOptions = new DocumentBuilder().setTitle("Y-Blog API").setVersion("0.1").addTag("Y-Blog").build();
	const document = SwaggerModule.createDocument(app, ApiOptions);
	SwaggerModule.setup("apiDoc", app, document);
	//静态目录
	app.use("/public", serveStatic(path.join(__dirname, "../uploadFile"), {
		maxAge: "1d",
		extensions: ["jpg", "jpeg", "png", "gif"],
	}));
	//使用安全策略
	app.use(helmet());
	//跨域
	app.enableCors();
	await app.listen(8080);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}

bootstrap();
