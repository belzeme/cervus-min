import express from 'express';
import { getLogger } from '../services/logging.service';
const logger = getLogger('request');

const formatRequestLog = (req: express.Request) => {
  return `${new Date().toISOString()} - ${req.method} ${req.path}`;
};

export const requestLogger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.info(formatRequestLog(req));
  next();
};
