import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { readdir, stat } from 'node:fs/promises';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private genNewFileName(prefix) {
    const date = new Date();

    return `${prefix}__${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate() + 1).padStart(
      2,
      '0',
    )}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.log_current`;
  }

  private async getFilePathByPrefix(prefix = 'LOG') {
    const logDir = path.join(__dirname, '../../', process.env.LOG_DIR || 'log');

    try {
      const existedCurrentLogFile = (await readdir(logDir)).filter(
        (file) => file.startsWith(prefix) && file.endsWith('_current'),
      )[0];

      return existedCurrentLogFile
        ? path.join(logDir, existedCurrentLogFile)
        : path.join(logDir, this.genNewFileName(prefix));
    } catch (err) {
      console.log(err);
    }
  }

  private async writeLogToFile(data: string, filePath: string): Promise<void> {
    if (process.env.LOG_ENABLED !== 'true') return;

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

      fileToWrite = await this.getFilePathByPrefix();
    }
    try {
      const stream = fs.createWriteStream(fileToWrite, { flags: 'a' });
      stream.write(data + '\r\n');
    } catch (err) {
      console.log(err);
    }
  }

  private renderLine(data, prefix) {
    return 'req' in data
      ? `${prefix} (${data.timeStamp}) >>> REQUEST (${data.req.method}: ${
          data.req.url
        }, QUERY: ${JSON.stringify(data.req.query)}):  BODY: ${JSON.stringify(
          data.req.body,
        )}  >>> RESPONSE (${data.res.code}):  BODY: ${JSON.stringify(
          data.res.body,
        )}`
      : `${prefix} (${data.timeStamp}) >>> (${
          data.res.code
        }):  ${JSON.stringify(data.res.body)}`;
  }

  /**
   * Write a 'log' level log.
   */

  async log(message: any, ...optionalParams: any[]) {
    if (message.timeStamp !== undefined) {
      await this.writeLogToFile(
        this.renderLine(message, 'LOG'),
        await this.getFilePathByPrefix('LOG'),
      );
    }
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  async error(message: any, ...optionalParams: any[]) {
    if (message.timeStamp !== undefined) {
      await this.writeLogToFile(
        this.renderLine(message, 'ERROR'),
        await this.getFilePathByPrefix('ERROR'),
      );
    }
    super.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  async warn(message: any, ...optionalParams: any[]) {
    if (message.timeStamp !== undefined) {
      await this.writeLogToFile(
        this.renderLine(message, 'WARNING'),
        await this.getFilePathByPrefix('LOG'),
      );
    }
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
