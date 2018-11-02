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
    childProcess.execSync(
      `node-sass ${filePath} static${path.sep}css${path.sep}${entry}.css`,
      function(error) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      }
    );
  });
  console.log('finish build scss');
}

/* 根据watch编译单个scss文件 */
function sasscSimple(filePath) {
  const filePathArray = filePath.split(path.sep);
  const targetName = filePathArray.slice(2, -1).join('-');
  childProcess.execSync(
    `node-sass ${filePath} static${path.sep}css${path.sep}${targetName}.css`,
    function(error) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  );
  console.log(`update finish file: ${targetName}`);
}

/* 监听scss文件变化并编译 */
function sasscDev() {
  fs.removeSync(webpackPath.cssPath);
  const watcher = chokidar.watch(`./views/**/*.scss`);
  watcher.on('all', (event, filePath) => {
    if (event !== 'error') {
      if (filePath.includes(webpackPath.scssEntry)) {
        sasscSimple(filePath);
      } else {
        /* 不是入口的scss改变时，重新编译所有scss文件 */
        sassc();
      }
    } else {
      const error = filePath;
      console.error(error);
      watcher.close();
    }
  });
  console.log('start watch!');
}

let env = 'production';
if (process.argv) {
  const args = process.argv.filter(arg => arg.slice(0, 4) === 'env=');
  if (args.length > 0) [, env] = args[args.length - 1].split('=');
}
if (env === 'production') {
  sassc();
} else if (env === 'development') {
  sasscDev();
}
