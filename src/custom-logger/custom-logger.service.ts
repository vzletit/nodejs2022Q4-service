import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { readdir, stat, mkdir } from 'node:fs/promises';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private level = process.env.LOG_LEVEL || 0;

  private genNewFileName(prefix) {
    const date = new Date();

    return `${prefix}__${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate() + 1).padStart(
      2,
      '0',
    )}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.log_current`;
  }

  private async checkDirectoryExists(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
      super.warn(
        `LOG directory ${directoryPath} not found and will be created.`,
      );
      fs.mkdirSync(directoryPath);
    }
  }

  private getFilePathByPrefix(prefix: string) {
    const logDirectory = path.join(
      __dirname,
      '../../',
      process.env.LOG_DIR || 'log',
    );

    this.checkDirectoryExists(logDirectory);

    try {
      const existedCurrentLogFile = fs
        .readdirSync(logDirectory)
        .filter(
          (file) => file.startsWith(prefix) && file.endsWith('_current'),
        )[0];

      return existedCurrentLogFile
        ? path.join(logDirectory, existedCurrentLogFile)
        : path.join(logDirectory, this.genNewFileName(prefix));
    } catch (err) {}
  }

  private writeLogToFile(
    prefix: string,
    data: string,
    filePath: string,
  ): Promise<void> {
    if (process.env.LOG_ENABLED !== 'true' || !filePath) return;

    let fileSize = 0;

    try {
      if (fs.existsSync(filePath)) {
        fileSize = fs.statSync(filePath).size;
      }
    } catch (err) {}

    let fileToWrite = filePath;

    if (fileSize / 1024 >= Number(process.env.LOG_LIMIT_FILE_SIZE)) {
      const closedLogPath = filePath.replace('.log_current', '.log');
      fs.renameSync(filePath, closedLogPath);

      fileToWrite = this.getFilePathByPrefix(prefix);
    }

    fs.appendFileSync(fileToWrite, data + '\r\n', 'utf-8');
  }

  private renderLine(data, prefix) {
    return 'req' in data
      ? `${prefix} (${data.timeStamp}) >>> REQ (${
          data.req.url
        }, QUERY: ${JSON.stringify(data.req.query)}, ${
          data.req.method
        }):  BODY: ${JSON.stringify(data.req.body)} >>> RES (${
          data.res.code
        }):  BODY: ${JSON.stringify(data.res.body)}`
      : `${prefix} (${data.timeStamp}) > (${data.res.code}):  ${JSON.stringify(
          data.res.body,
        )}`;
  }

  /**
   * Write an 'error' level log.
   */
  async error(message: any, ...optionalParams: any[]) {
    if (this.level >= 0 && message.timeStamp !== undefined) {
      const prefix = 'ERROR';
      const fileToWriteFullPath = this.getFilePathByPrefix(prefix);
      const formattedLine = this.renderLine(message, prefix);

      this.writeLogToFile(prefix, formattedLine, fileToWriteFullPath);
      return super.error(this.renderLine(message, ':'));
    }
    super.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  async warn(message: any, ...optionalParams: any[]) {
    if (this.level >= 0 && message.timeStamp !== undefined) {
      const prefix = 'WARN';
      const fileToWriteFullPath = this.getFilePathByPrefix(prefix);
      const formattedLine = this.renderLine(message, prefix);

      this.writeLogToFile(prefix, formattedLine, fileToWriteFullPath);
      return super.warn(this.renderLine(message, ':'));
    }
    super.warn(message);
  }

  /**
   * Write a 'log' level log.
   */

  async log(message: any, ...optionalParams: any[]) {
    if (this.level >= 0 && message.timeStamp !== undefined) {
      const prefix = 'LOG';
      const fileToWriteFullPath = this.getFilePathByPrefix(prefix);
      const formattedLine = this.renderLine(message, prefix);

      this.writeLogToFile(prefix, formattedLine, fileToWriteFullPath);
      return super.log(this.renderLine(message, ':'));
    }
    super.log(message);
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
  verbose(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
}
