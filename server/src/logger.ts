import { configure, getLogger, Logger } from 'log4js';
import * as path from 'path';
import * as fs from 'fs';
import { FrameworkConfig } from './api';
const logger: Logger = getLogger();
logger.level = 'off';
const configureLogger = (basePath: string) => {
  configure({
    "appenders": {
      "access": {
        "type": "dateFile",
        "filename": path.join(basePath, "log", "access.log"),
        "pattern": "-yyyy-MM-dd",
        "category": "http",
        "maxLogSize": 10485760, // 10MB
        "backups": 3,
        "compress": true
      },
      "app": {
        "type": "file",
        "filename": path.join(basePath, "log", "app.log"),
        "maxLogSize": 10485760, // 10MB
        "backups": 3,
        "compress": true
      },
      "errorFile": {
        "type": "file",
        "filename": path.join(basePath, "log", "errors.log"),
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
}


type loggerLevels = 'all' | 'trace' | 'fatal' | 'error' | 'off' | 'info' | 'warn' | 'debug'

function enableLogger(config: FrameworkConfig) {
  let basePath = config.logBasePath || __dirname;
  try {
    if (!fs.existsSync(path.join(basePath, 'log'))) {
      fs.mkdirSync(path.join(basePath, 'log'));
    }
  } catch (error) {
    console.error(`error while creating log folder while enabling logger ${error}`);
  }
  configureLogger(basePath)
  logger.level = config.logLevel || 'debug';
}
export { logger, enableLogger, loggerLevels };
