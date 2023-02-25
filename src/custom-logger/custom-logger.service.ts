import { Injectable, LoggerService, ConsoleLogger } from '@nestjs/common';
@Injectable()
export class CustomLogger extends ConsoleLogger {
  // writeFile() {}

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    super.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    super.warn(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  /**
   * Write a 'verbose' level log.
   */
}
