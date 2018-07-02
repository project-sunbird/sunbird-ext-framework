import { configure, getLogger, Logger } from 'log4js';
import * as path from 'path';
const logger: Logger = getLogger();
logger.level = 'debug';

/**
 * make a log directory, just in case it isn't there.
 */
try {
  require('fs').mkdirSync(path.join(__dirname, 'log'));
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}


configure({
  "appenders": {
    "access": {
      "type": "dateFile",
      "filename": "log/access.log",
      "pattern": "-yyyy-MM-dd",
      "category": "http"
    },
    "app": {
      "type": "file",
      "filename": "log/app.log",
      "maxLogSize": 10485760, // 10MB
      "numBackups": 3
    },
    "errorFile": {
      "type": "file",
      "filename": "log/errors.log"
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

export { logger };
export * from 'log4js';
