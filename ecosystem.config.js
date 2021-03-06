const INSTANCE_ID_1 = 'MAZAI_DEMO_1';
const INSTANCE_ID_2 = 'MAZAI_DEMO_2';
const INSTANCE_ID_TEST = 'MAZAI_DEMO_TEST';
const INSTANCE_ID_RC = 'MAZAI_DEMO_RC';

module.exports = {
  apps: [
    {
      name: 'mazai-demo-test',
      script: './dist/app.js',
      max_memory_restart: '200M',
      exec_mode: 'cluster',
      instances: 2,
      instance_var: INSTANCE_ID_TEST,
      error: './dist/logs/pm2/error-test.log',
      output: './dist/logs/pm2/output-test.log',
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        APP_NAME: INSTANCE_ID_TEST,
        PORT: 3000,
        NODE_ENV: 'test',
        BASE_URL: '',
        MAP_URL: '',
        PM2_CLUSTER: true,
        PM2_INSTANCE_VAR: INSTANCE_ID_TEST
      }
    },
    {
      name: 'mazai-demo-rc',
      script: './dist/app.js',
      max_memory_restart: '200M',
      exec_mode: 'cluster',
      instances: 2,
      instance_var: INSTANCE_ID_RC,
      error: './dist/logs/pm2/error-rc.log',
      output: './dist/logs/pm2/output-rc.log',
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        APP_NAME: INSTANCE_ID_RC,
        PORT: 3001,
        NODE_ENV: 'rc',
        BASE_URL: '',
        MAP_URL: '',
        PM2_CLUSTER: true,
        PM2_INSTANCE_VAR: INSTANCE_ID_RC
      }
    },
    {
      name: 'mazai-demo-1',
      script: './dist/app.js',
      max_memory_restart: '300M',
      exec_mode: 'cluster',
      instances: 2,
      instance_var: INSTANCE_ID_1,
      error: './dist/logs/pm2/error.log',
      output: './dist/logs/pm2/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        APP_NAME: INSTANCE_ID_1,
        PORT: 3000,
        NODE_ENV: 'production',
        BASE_URL: '',
        MAP_URL: '',
        PM2_CLUSTER: true,
        PM2_INSTANCE_VAR: INSTANCE_ID_1
      }
    },
    {
      name: 'mazai-demo-2',
      script: './dist/app.js',
      max_memory_restart: '300M',
      exec_mode: 'cluster',
      instances: 2,
      instance_var: INSTANCE_ID_2,
      error: './dist/logs/pm2/error.log',
      output: './dist/logs/pm2/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        APP_NAME: INSTANCE_ID_1,
        PORT: 3000,
        NODE_ENV: 'production',
        BASE_URL: '',
        MAP_URL: '',
        PM2_CLUSTER: true,
        PM2_INSTANCE_VAR: INSTANCE_ID_2
      }
    }
  ]
};
