import winston from 'winston';

/**
 * The possible log levels
 */
export enum logLevels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly'
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

const getLeveledLogger =
  (level: string) => (prefix: string) => (message: string | object) => {
    if (!Object.values<string>(logLevels).includes(level)) {
      logger.error(`[loggingService]: invalid level ${level}`);
      getLeveledLogger(logLevels.debug)(prefix)(message);
      return;
    }
    logger.log(level, `[${prefix}]: ${message}`);
    return;
  };

export const getLogger = (prefix: string) => ({
  error: getLeveledLogger(logLevels.error)(prefix),
  warn: getLeveledLogger(logLevels.warn)(prefix),
  info: getLeveledLogger(logLevels.info)(prefix),
  verbose: getLeveledLogger(logLevels.verbose)(prefix),
  debug: getLeveledLogger(logLevels.debug)(prefix),
  silly: getLeveledLogger(logLevels.silly)(prefix)
});
