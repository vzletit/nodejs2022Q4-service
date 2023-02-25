import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './custom-logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private customLogger: CustomLogger) {}
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl, query, body } = request;

    const send = response.send;
    response.send = (exitData) => {
      if (
        response
          ?.getHeader('content-type')
          ?.toString()
          .includes('application/json')
      ) {
        const logObj = { TIMESTAMP: new Date(), REQ: null, RES: null };

        logObj.RES = {
          code: response.statusCode,
          body: JSON.parse(exitData),
        };
        logObj.REQ = { method, url: baseUrl, query, body };

        if (response.statusCode >= 200 && response.statusCode <= 300) {
          this.customLogger.log(logObj);
        }
      }
      // throw new Error();

      response.send = send;

      return response.send(exitData);
    };

    next();
  }
}
