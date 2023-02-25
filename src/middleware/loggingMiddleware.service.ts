import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url, query, body } = request;

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
          body: exitData.toString().substring(0, 1000),
        };
        logObj.REQ = { method, url, query, body };

        console.log(logObj);
      }
      response.send = send;
      return response.send(exitData);
    };

    next();
  }
}
