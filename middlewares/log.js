import log4js from 'log4js';
import path from 'path';

const getFilePath = (function() {
  const middlePath = process.env.NODE_ENV === 'development' ? '../logs' : '../../logs';
  return function(childPath) {
    return path.resolve(__dirname, middlePath, childPath);
  };
})();

log4js.configure({
  appenders: {
    output: { type: 'console' },
    everything: {
      type: 'dateFile',
      filename: getFilePath('default/everything'),
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    apiGet: {
      type: 'dateFile',
      filename: getFilePath('api/get'),
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    apiPost: {
      type: 'dateFile',
      filename: getFilePath('api/post'),
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    others: {
      type: 'file',
      filename: getFilePath('default/other.log'),
      maxLogSize: 10485760, // 最大10MB
      backups: 5 // 保留5个文件
    }
  },
  categories: {
    default: { appenders: ['everything'], level: 'DEBUG' },
    console: { appenders: ['output'], level: 'INFO' },
    get: { appenders: ['apiGet'], level: 'INFO' },
    post: { appenders: ['apiPost'], level: 'INFO' },
    other: { appenders: ['others'], level: 'INFO' }
  },
  pm2: !!process.env.PM2_CLUSTER,
  pm2InstanceVar: process.env.PM2_CLUSTER ? process.env.PM2_INSTANCE_VAR : undefined
});

export function getLogger(name = 'default', level = 'INFO') {
  const logger = log4js.getLogger(name);
  logger.level = level;
  return logger;
}

export function useLog(logger, level = 'INFO') {
  return log4js.connectLogger(logger, { level });
}
