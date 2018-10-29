import path from 'path';
import fs from 'fs';

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
  })
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
    const fileName = segments.join(path.sep) +  postfix;
    output[fileName] = `.${path.sep}${entry}`;
  })
  return output;
}

/**
 * @param {string} mode 'development' | 'production' | 'test'
 */
export default function(mode) {
  let entry = collectFiles(webpackPath.views, webpackPath.vueEntry, []);
  entry = transformEntries(entry, '-bundle');
  entry.vendors = webpackPath.vendorDependencies;
  if (mode === 'development') entry['hmr'] = 'webpack-hot-middleware/client?reload=true';
  const webpackConfig = {
    ...baseConfig,
    mode,
    entry,
    watch: mode === 'development'
  };
  return webpackConfig;
}

