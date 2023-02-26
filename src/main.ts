import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './exceptions/allException.filter';
import { CustomLogger } from './custom-logger/custom-logger.service';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(CustomLogger));
  app.useGlobalFilters(new AllExceptionFilter(new CustomLogger()));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // const config = new DocumentBuilder()
  //   .setTitle('Library service')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('doc', app, document);

  // setTimeout(() => {
  //   throw new Error();
  // }, 5000);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
