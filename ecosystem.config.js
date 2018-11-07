const instanceID = 'xxx';

module.exports = {
  apps: [
    {
      name: 'mazai-pc',
      script: './dist/app.js',
      // max_memory_restart: '1G',
      /* exec_mode: 'cluster',
      instances: 'max',
      instance_var: instanceID, */
      error: './dist/logs/pm2/-error.err',
      output: './dist/logs/pm2/-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PM2_CLUSTER: false,
        PM2_INSTANCE_VAR: instanceID,
      },
    },
  ],
};
