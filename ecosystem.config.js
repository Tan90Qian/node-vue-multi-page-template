module.exports = {
  apps: [
    {
      name: 'mazai-pc',
      script: './dist/app.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
