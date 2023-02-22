import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingService implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      'Logging HTTP request: ' + req.method,
      req.url,
      req.query,
      req.body,
      res.statusCode,
    );
    next();
  }
}
