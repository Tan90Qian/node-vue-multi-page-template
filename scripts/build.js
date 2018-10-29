import webpack from 'webpack';
import path from 'path';
import { ncp } from 'ncp';
import md5 from 'blueimp-md5';
import fs from 'fs';
import fs2 from 'fs-extra';

import configProducer from './webpack-config/config-producer';

function copyFiles() {
  const args = process.argv.filter(arg => arg.slice(0,7) === 'target=');
  let distPath = './dist';
  if (args.length > 0)  [,distPath] = args[args.length - 1].split('=');

  ncp.limit = 16;
  ncp('views', `${distPath}/views`, {
    filter: function(fileName) {
      /* 复制文件夹、art模板文件和原始css文件 */
      if(!fileName.includes('.')) return true
      return /\.(art|css)$/.test(fileName);
    }
  },function(err) {
    if (err) console.log(err);
    console.log('copy views success');
  });
  /* 提前创建static目录，防止后续任务报错 */
  fs.mkdirSync(`${distPath}/static`);
  fs.mkdirSync(`${distPath}/static/rev`);
  /* 拷贝dist目录 */
  ncp('static/dist', `${distPath}/static/dist`, function(err) {
    if (err) console.log(err); 
    console.log('copy static dist folder success');
  })
  const cssMap = {};
  /* 拷贝css目录 */
  ncp('static/css', `${distPath}/static/css`, {
    rename: function(target) {
      if (path.basename(target).includes('css')) {
        const pathArray = target.split(path.sep);
        const [fileNameWithPostfix] = pathArray.slice(-1);
        const relativePath = pathArray.slice(0, -1).join(path.sep);
        const [fileName, postfix] = fileNameWithPostfix.split('.');
        const fileMd5 = md5(fileName);
        cssMap[fileName] = `${fileName}-${fileMd5}.${postfix}`;
        return `${relativePath}${path.sep}${fileName}-${fileMd5}.${postfix}`;
      }
      return target;
    }
  },function(err) {
    if (err) console.log(err);
    /* 写入cssMap数据，用于prod下文件名映射 */
    fs2.writeJSONSync(`${distPath}/static/rev/css-map.json`, cssMap);
    console.log('copy static css folder success');
  })
}

const webpackConfig = configProducer('production');
const compiler = webpack(webpackConfig);
// console.log(webpackConfig);
compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
  console.log('build success');
  copyFiles();
});