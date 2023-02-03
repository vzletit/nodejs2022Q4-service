import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // только разрешенне параметры в DTO. (принимает всё, не ругается, но лишние не вернёт)
    }),
  );
  await app.listen(4000);
}
bootstrap();
