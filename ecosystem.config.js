const instanceID = 'MAZAI_DEMO';

module.exports = {
  apps: [
    {
      name: 'mazai-demo',
      script: './dist/app.js',
      max_memory_restart: '300M',
      exec_mode: 'cluster',
      instances: 2,
      instance_var: instanceID,
      error: './dist/logs/pm2/error.log',
      output: './dist/logs/pm2/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        BASE_URL: '',
        MAP_URL: '',
        PM2_CLUSTER: false,
        PM2_INSTANCE_VAR: instanceID
      },
      env_test: {
        NODE_ENV: 'test',
        BASE_URL: '',
        MAP_URL: '',
        PM2_CLUSTER: false,
        PM2_INSTANCE_VAR: instanceID
      }
    }
  ]
};
