/* 该文件暂时不用，通过webpack打包 */
import fs from 'fs-extra';
import path from 'path';
import childProcess from 'child_process';

import webpackPath from './webpack-config/path';
import { transformEntries, collectFiles } from './webpack-config/config-producer';

const chokidar = require('chokidar');

/* 编译es6文件 */
function build() {
  fs.emptyDirSync(webpackPath.distPath);;
  let es6Entry = collectFiles(webpackPath.views, webpackPath.es6Entry, []);
  es6Entry = transformEntries(es6Entry);
  Object.keys(es6Entry).forEach(entry => {
    const filePath = es6Entry[entry];
    const targetPath = `static${path.sep}js${path.sep}${entry}.js`;
    childProcess.execSync(
      `babel ${filePath} -o ${targetPath}`, 
      function (error) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      }
    )
  })
  console.log('finish build es6');
}

/* 根据watch编译单个scss文件 */
function buildSimple(filePath) {
  const filePathArray = filePath.split(path.sep);
  const [targetName] = filePathArray.slice(-2);
  const targetPath = `static${path.sep}js${path.sep}${targetName}.js`;
  childProcess.execSync(
    `babel ${filePath} -o ${targetPath}`, 
    function (error) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  )
  console.log(`update finish file: ${targetName}`);
}

/* 监听scss文件变化并编译 */
function buildDev() {
  fs.emptyDirSync(webpackPath.distPath);
  const watcher = chokidar.watch(`./views/**/${webpackPath.es6Entry}`)
  watcher.on('all', (event, filePath) => {
    if (event !== 'error') {
      buildSimple(filePath);
    } else {
      const error = filePath;
      console.error(error);
      watcher.close();
    }
  })
  console.log('start watch!');
}

let env = 'production';
if (process.argv) {
  const args = process.argv.filter(arg => arg.slice(0,4) === 'env=');
  if (args.length > 0)  [,env] = args[args.length - 1].split('=');
}
if (env === 'production') {
  build();
} else if (env === 'development') {
  buildDev();
}