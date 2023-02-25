import { Module } from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';
import { LoggingMiddleware } from './custom-logger.middleware';
@Module({
  providers: [CustomLogger, LoggingMiddleware],
  exports: [CustomLogger],
})
export class LoggerModule {}
