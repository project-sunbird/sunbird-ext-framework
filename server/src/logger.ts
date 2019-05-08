import { configure, getLogger, Logger } from 'log4js';
import * as path from 'path';
const logger: Logger = getLogger();
logger.level = 'off';

configure({
  "appenders": {
    "access": {
      "type": "dateFile",
      "filename": "log/access.log",
      "pattern": "-yyyy-MM-dd",
      "category": "http",
      "maxLogSize": 10485760, // 10MB
      "backups": 3,
      "compress": true
    },
    "app": {
      "type": "file",
      "filename": "log/app.log",
      "maxLogSize": 10485760, // 10MB
      "backups": 3,
      "compress": true
    },
    "errorFile": {
      "type": "file",
      "filename": "log/errors.log",
      "maxLogSize": 10485760, // 10MB
      "backups": 3,
      "compress": true
    },
    "errors": {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": "errorFile"
    },
    "console": {
      "type": "console",
      "layout": {
        "type": "coloured"
      }
    }
  },
  "categories": {
    "default": { "appenders": ["app", "errors", "console"], "level": "DEBUG" },
    "http": { "appenders": ["access"], "level": "DEBUG" }
  }
});

type loggerLevels = 'all' | 'trace' | 'fatal' | 'error' | 'off' | 'info' | 'warn' | 'debug'

function enableLogger(level?: loggerLevels) {
  logger.level = level || 'debug';
}
export { logger, enableLogger, loggerLevels };
