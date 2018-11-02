import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import StyleLintPlugin from 'stylelint-webpack-plugin';

import webpackPath from './path';
import baseConfig from './base-config';

/**
 * collect all vue-entry.js in views folder, DFS algorithm
 * @param {string} folder target folder
 * @param {string} targetFileName name of target files
 * @param {string[]} files file names (pages/home/vue-entry.js -> pages/home)
 */
export function collectFiles(targetFolder, targetFileName, files) {
  const folders = [];
  fs.readdirSync(targetFolder)
    .map(name => path.join(targetFolder, name))
    .forEach(source => {
      if (fs.lstatSync(source).isDirectory()) folders.push(source);
      else if (source.includes(targetFileName)) files.push(source);
    });
  folders.forEach(f => collectFiles(f, targetFileName, files));
  return files;
}

/**
 * generate object entry for webpack
 * @param {string[]} entries entry file path (absolute path)
 * @return {object} { fileName: path }
 * @return {string} fileName: relative path to pages. such as pages/home-bundle
 */
export function transformEntries(entries, postfix = '') {
  const output = {};
  entries.forEach(entry => {
    const segments = entry.split(path.sep);
    segments.splice(-1);
    segments.splice(0, 2);
    const fileName = segments.join('-') + postfix;
    output[fileName] = `.${path.sep}${entry}`;
  });
  return output;
}

/**
 * @param {string} mode 'development' | 'production' | 'test'
 */
export default function getWebpackConfig(mode) {
  let entry = collectFiles(webpackPath.views, webpackPath.vueEntry, []);
  entry = transformEntries(entry, '-bundle');
  /* 模板文件引入的js文件 */
  let es6Entry = collectFiles(webpackPath.views, webpackPath.es6Entry, []);
  es6Entry = transformEntries(es6Entry);
  /* 入口整合 */
  entry = { ...entry, ...es6Entry };
  entry.vendors = webpackPath.vendorDependencies;
  let { plugins } = baseConfig;
  if (mode === 'development') {
    /* 开发环境引入hmr和相关插件 */
    entry.hmr = 'webpack-hot-middleware/client?reload=true';
    plugins = plugins.concat(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new StyleLintPlugin({
        files: ['**/*.{vue,htm,html,css,scss,sass}'],
      })
    );
  }
  const webpackConfig = {
    ...baseConfig,
    mode,
    entry,
    watch: mode === 'development',
    plugins,
  };
  return webpackConfig;
}
