module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:vue/essential', 'prettier'],
  plugins: ['vue'],
  rules: {
    'import/extensions': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'no-new': [0],
    'no-console': [0],
  },
};
