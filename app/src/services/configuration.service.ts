import { getLogger } from './logging.service';

const logger = getLogger('configuration.service');

export const logEnv = () => {
  const loggedEnvValues = ['PORT', 'NODE_ENV'];
  const loggedEntries = Object.entries(process.env).filter(([key]) =>
    loggedEnvValues.includes(key)
  );
  logger.info(JSON.stringify(Object.fromEntries(loggedEntries), undefined, 2));
};

export const getProcessEnvValue = (envVariableName: string) => {
  return process.env[envVariableName];
};
