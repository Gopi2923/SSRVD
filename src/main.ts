import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './Common/exception.filter';
const cors = require("cors");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3501);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.use(cors({
    origin: "*", methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
}
bootstrap();
