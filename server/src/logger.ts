import * as winston from 'winston';

const myLogFormatter = function (options) {
  return winston.config.colorize(options.level, options.level.toUpperCase())
    + ": [" + options.timestamp() + "| " + options.meta.codePath + "] "
    + options.message + " " + JSON.stringify(options.meta);
};

const options = {
  file: {
    // level: 'info',
    // filename: `./logs/app.log`,
    // handleExceptions: true,
    // json: true,
    // maxsize: 5242880, // 5MB
    // maxFiles: 5,
    // colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    formatter: myLogFormatter
  },
};

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false // do not exit on handled exceptions
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
