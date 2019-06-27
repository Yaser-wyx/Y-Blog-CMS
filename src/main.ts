import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import { MyLogger } from "./myLogger";
import * as helmet from "helmet";

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule, {
		logger: new MyLogger(),
	});
	app.use(helmet());
	app.enableCors();
	await app.listen(8080);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}

bootstrap();
