import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { RpcExceptionFilter } from '@app/common';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loger = new Logger();
  const port = process.env.PORT;

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen(port);
  loger.log('-------------------------------------------------');
  loger.log('-------------------------------------------------');
  loger.log(`-------- App listening on port : ${port}---------`);
  loger.log('-------------------------------------------------');
  loger.log('-------------------------------------------------');
}
bootstrap();
