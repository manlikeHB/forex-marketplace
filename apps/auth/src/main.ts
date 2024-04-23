import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth.proto'),
        package: AUTH_PACKAGE_NAME,
      },
    },
  );
  const logger = app.get(Logger);

  logger.log('---------------------------------------------------------------');
  logger.log('---------------------------------------------------------------');
  logger.log(`--------AUTH MICROSERVICE RUNNING-----------------------------`);
  logger.log('---------------------------------------------------------------');
  logger.log('---------------------------------------------------------------');

  await app.listen();
}
bootstrap();
