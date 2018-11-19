import fs from 'fs-extra';
import path from 'path';
import childProcess from 'child_process';

import webpackPath from './webpack-config/path';
import { transformEntries, collectFiles } from './webpack-config/config-producer';

const chokidar = require('chokidar');

/* 编译scss文件 */
function sassc() {
  fs.removeSync(webpackPath.cssPath);
  let scssEntry = collectFiles(webpackPath.views, webpackPath.scssEntry, []);
  scssEntry = transformEntries(scssEntry);
  Object.keys(scssEntry).forEach(entry => {
    const filePath = scssEntry[entry];
    try {
      childProcess.execSync(`node-sass ${filePath} static${path.sep}css${path.sep}${entry}.css`);
    } catch (error) {}
  });
  console.log('finish build scss');
}

/* 根据watch编译单个scss文件 */
function sasscSimple(filePath) {
  const filePathArray = filePath.split(path.sep);
  const targetName = filePathArray.slice(2, -1).join('-');
  try {
    childProcess.execSync(`node-sass ${filePath} static${path.sep}css${path.sep}${targetName}.css`);
  } catch (error) {}
  console.log(`update finish file: ${targetName}`);
}

/* 监听scss文件变化并编译 */
function sasscDev() {
  /* 初始化时先统一编译 */
  sassc();
  const watcher = chokidar.watch(`./views/**/*.scss`);
  /* 上一个操作是否是删除文件，用于判断是否是文件的移动 */
  let lastUnlink = false;
  watcher.on('all', (event, filePath) => {
    if (event === 'change') {
      if (filePath.includes(webpackPath.scssEntry)) {
        sasscSimple(filePath);
      } else {
        /* 不是入口的scss改变时，重新编译所有scss文件 */
        sassc();
      }
      lastUnlink = false;
    } else if (event === 'unlink') {
      sassc();
      lastUnlink = true;
    } else if (event === 'add' && lastUnlink) {
      if (filePath.includes(webpackPath.scssEntry)) {
        sasscSimple(filePath);
      } else {
        /* 不是入口的scss改变时，重新编译所有scss文件 */
        sassc();
      }
      lastUnlink = false;
    } else if (event === 'error') {
      const error = filePath;
      console.error(error);
      watcher.close();
    }
  });
  console.log('start watch!');
}

const env = process.env.NODE_ENV || 'production';
if (env === 'production') {
  sassc();
} else if (env === 'development') {
  sasscDev();
}
