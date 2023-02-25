import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import { CustomLogger } from '../custom-logger/custom-logger.service';

export const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? exception['response']['message']
    : String(exception);
};

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  constructor(private customLogger: CustomLogger) {
    process.on('uncaughtException', () => {
      this.customLogger.error('uncaught Exception');
    });
    process.on('unhandledRejection', () => {
      this.customLogger.error('Unhandled Promise Rejection');
    });
  }

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const statusCode = getStatusCode<T>(exception);
    const message = getErrorMessage<T>(exception);

    this.customLogger.error({ message, statusCode });

    response.status(statusCode).json({
      error: {
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode,
        message,
      },
    });
  }
}
