import path from 'path';

const distFolder = 'dist';
const cssFolder = 'css';
const webpackPath = {
  distFolder: distFolder,
  distPath: path.resolve(__dirname, `../../static/${distFolder}`),
  cssPath: path.resolve(__dirname, `../../static/${cssFolder}`),
  views: 'views',
  vueEntry: 'vue-entry.js',
  vendorDependencies: ['vue']
};

export default webpackPath;