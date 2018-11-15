module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  extends: ['plugin:vue/essential', 'prettier'],
  plugins: ['vue'],
};
