module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // 告诉 Jest 处理 `*.vue` 文件
    'vue'
  ],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/views/components/$1'
  },
  transform: {
    // 用 `babel-jest` 处理 js
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  }
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'controller/**/*.{js,vue}',
  //   'utils/**/*.{js,vue}',
  //   'views/**/*.{js,vue}',
  //   '!**/node_modules/**'
  // ],
  // coverageReporters: ['html', 'text-summary']
};
