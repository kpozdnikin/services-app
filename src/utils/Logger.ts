import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

export class Logger {
  static Trace = (message: string) => {
    datadogLogs.logger.log(message);
  };
  static Info = (message: string) => {
    datadogLogs.logger.log(message);
  };
  static Error = (error: Error) => {
    datadogLogs.logger.error(error.message);
    datadogRum.addError(error);
  };
  static Warn = (message: string) => {
    datadogLogs.logger.warn(message);
  };
  static Log = (message: string) => {
    datadogLogs.logger.log(message);
  };
}
