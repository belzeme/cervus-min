import express, { RequestHandler } from 'express';
import { rootHandler } from './pathHandlers/root.handler';
import { getLogger } from './services/logging.service';
import { getProcessEnvValue, logEnv } from './services/configuration.service';
import { requestLogger } from './middlewares/logExpressRequest.middleware';

const logger = getLogger('main');
const defaultMiddlewares = [requestLogger];

const loadMiddlewares = (
  app: express.Application,
  middlewares: RequestHandler[] = defaultMiddlewares
) => {
  middlewares.forEach((middleware) => app.use(middleware));
};

const startUp = () => {
  const app = express();
  loadMiddlewares(app);
  app.get('/', rootHandler);
  app.listen(getProcessEnvValue('PORT'), () => {
    logger.info('server launched');
    logEnv();
  });
};

startUp();
