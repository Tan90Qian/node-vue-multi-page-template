import log4js from 'log4js';
import path from 'path';

log4js.configure({
  appenders: {
    output: { type: 'console' },
    everything: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../logs/default/everything'),
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: { appenders: ['everything'], level: 'DEBUG' },
    console: { appenders: ['output'], level: 'INFO' },
  },
  pm2: !!process.env.PM2_CLUSTER,
  pm2InstanceVar: process.env.PM2_CLUSTER ? process.env.PM2_INSTANCE_VAR : undefined,
});

export function getLogger(name = 'default', level = 'INFO') {
  const logger = log4js.getLogger(name);
  logger.level = level;
  return logger;
}

export function useLog(logger, level = 'INFO') {
  return log4js.connectLogger(logger, { level });
}
