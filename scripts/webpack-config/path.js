import path from 'path';

const distFolder = 'dist';
const webpackPath = {
  distFolder: distFolder,
  distPath: path.resolve(__dirname, `../../static/js`),
  cssPath: path.resolve(__dirname, '../../static/css'),
  views: 'views',
  vueEntry: 'vue-entry.js',
  scssEntry: 'art-style.scss',
  es6Entry: 'art-es6.js',
  transformCssPath: 'static/css',
  vendorDependencies: ['vue']
};

export default webpackPath;