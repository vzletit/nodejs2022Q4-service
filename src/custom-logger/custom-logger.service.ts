import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { readdir, stat } from 'node:fs/promises';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private genNewFileName() {
    const date = new Date();

    return `${process.env.LOG_PREFIX}${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate() + 1).padStart(
      2,
      '0',
    )}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.log_current`;
  }

  private async getLogFilePath() {
    const logDir = path.join(__dirname, '../../', process.env.LOG_DIR || 'log');

    try {
      const existedCurrentLogFile = (await readdir(logDir)).filter((file) =>
        file.endsWith('_current'),
      )[0];

      return existedCurrentLogFile
        ? path.join(logDir, existedCurrentLogFile)
        : path.join(logDir, this.genNewFileName());
    } catch (err) {
      console.log(err);
    }
  }

  private formatString(str: string): string {
    return str.split('"').join('').split(',').join(', ');
  }

  private async writeLogToFile(data: string, filePath: string): Promise<void> {
    if (process.env.LOG_ENABLED !== 'true') return;

    console.log('WRITE!!!', data);

    let fileSize = 0;

    try {
      await fs.promises.access(filePath);
      fileSize = (await stat(filePath)) ? (await stat(filePath)).size : 0;
    } catch (err) {}

    let fileToWrite = filePath;

    if (fileSize / 1000 >= Number(process.env.LOG_LIMIT_FILE_SIZE)) {
      const closedLogPath = filePath.replace('.log_current', '.log');
      fs.rename(filePath, closedLogPath, (err) => {
        if (err) {
          console.log(err);
        }
      });

      fileToWrite = await this.getLogFilePath();
    }
    try {
      const stream = fs.createWriteStream(fileToWrite, { flags: 'a' });
      stream.write(data + '\r\n');
      // stream.end();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Write a 'log' level log.
   */

  async log(message: any, ...optionalParams: any[]) {
    if (message.req !== undefined) {
      const serializedRequest = this.formatString(JSON.stringify(message.req));
      const serializedResponse = this.formatString(JSON.stringify(message.res));

      await this.writeLogToFile(
        `LOG ::: (${message.timeStamp}) >> REQUEST: ${serializedRequest} >> RESPONSE: ${serializedResponse}`,
        await this.getLogFilePath(),
      );
    }
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  async error(message: any, ...optionalParams: any[]) {
    await this.writeLogToFile(
      `ERR (${message.error.timeStamp}) (${message.error.statusCode}) >>> ${message.error.message}`,
      await this.getLogFilePath(),
    );
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
