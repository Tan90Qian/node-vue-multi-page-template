import path from 'path';
import fs from 'fs';
import fs2 from 'fs-extra';
import process from 'child_process';

import webpackPath from './path';
import baseConfig from './base-config';

const chokidar = require('chokidar');

/**
 * collect all vue-entry.js in views folder, DFS algorithm
 * @param {string} folder target folder
 * @param {string} targetFileName name of target files
 * @param {string[]} files file names (pages/home/vue-entry.js -> pages/home)
 */
function collectFiles(targetFolder, targetFileName, files) {
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
function transformEntries(entries, postfix = '') {
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

/* 编译scss文件 */
export function sassc() {
  fs2.removeSync(webpackPath.cssPath);
  let scssEntry =  collectFiles(webpackPath.views, webpackPath.scssEntry, []);
  scssEntry = transformEntries(scssEntry);
  Object.keys(scssEntry).forEach(entry => {
    const filePath = scssEntry[entry];
    process.execSync(
      `node-sass ${filePath} static${path.sep}css${path.sep}${entry}.css`, 
      function (error) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      }
    )
  })
  console.log('finish build scss');
}

/* 根据watch编译单个scss文件 */
function sasscSimple(filePath) {
  const filePathArray = filePath.split(path.sep);
  const [targetName] = filePathArray.slice(-2);
  process.execSync(
    `node-sass ${filePath} static${path.sep}css${path.sep}${targetName}.css`, 
    function (error) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  )
  console.log(`update finish file: ${targetName}`);
}

/* 监听scss文件变化并编译 */
export function sasscDev() {
  fs2.removeSync(webpackPath.cssPath);
  const watcher = chokidar.watch('./views/**/art-style.scss')
  watcher.on('all', (event, filePath) => {
    if (event !== 'error') {
      sasscSimple(filePath);
    } else {
      const error = filePath;
      console.error(error);
      watcher.close();
    }
  })
  console.log('start watch!');
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

