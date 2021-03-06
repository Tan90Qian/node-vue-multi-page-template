import webpack from 'webpack';
import path from 'path';
import { ncp } from 'ncp';
import md5 from 'blueimp-md5';
import fs from 'fs-extra';

import configProducer from './webpack-config/config-producer';

function copyFiles() {
  const args = process.argv.filter(arg => arg.slice(0, 7) === 'target=');
  let distPath = './dist';
  if (args.length > 0) [, distPath] = args[args.length - 1].split('=');

  ncp.limit = 16;
  ncp(
    'views',
    `${distPath}/views`,
    {
      filter: function(fileName) {
        /* 复制文件夹、art模板文件和原始css文件 */
        if (!fileName.includes('.')) return true;
        return /\.(art|css)$/.test(fileName);
      }
    },
    function(err) {
      if (err) console.log(err);
      console.log('copy views success');
    }
  );
  /* 确保创建static目录，防止后续任务报错 */
  fs.ensureDirSync(`${distPath}/static`);
  fs.ensureDirSync(`${distPath}/static/rev`);
  copyJsFiles(distPath);
  copyCssFiles(distPath);
  copyPublicFiles(distPath);
}

/* 获取md5后的文件路径以及跟原文件的映射关系 */
function getFilePath(targetPath) {
  const pathArray = targetPath.split(path.sep);
  const [fileNameWithPostfix] = pathArray.slice(-1);
  const relativePath = pathArray.slice(0, -1).join(path.sep);
  const [fileName, postfix] = fileNameWithPostfix.split('.');
  /* 获取字符串形式的内容，用于生成hash */
  const contentString = fs.readFileSync(targetPath.replace(`dist${path.sep}`, ''), 'utf-8');
  const fileMd5 = md5(contentString).slice(0, 8);
  return {
    resultFilePath: `${relativePath}${path.sep}${fileName}.${fileMd5}.${postfix}`,
    mapFileName: `${fileName}.${fileMd5}.${postfix}`,
    fileName
  };
}

function copyJsFiles(distPath) {
  const jsMap = {};
  /* 拷贝js目录 */
  ncp(
    'static/js',
    `${distPath}/static/js`,
    {
      rename: function(target) {
        if (path.basename(target).includes('.js')) {
          const { resultFilePath, mapFileName, fileName } = getFilePath(target);
          jsMap[fileName] = mapFileName;
          return resultFilePath;
        }
        return target;
      }
    },
    function(err) {
      if (err) console.log(err);
      /* 写入jsMap数据，用于prod下文件名映射 */
      fs.writeJSONSync(`${distPath}/static/rev/js-map.json`, jsMap);
      console.log('copy static dist folder success');
    }
  );
}

function copyCssFiles(distPath) {
  const cssMap = {};
  /* 拷贝css目录 */
  ncp(
    'static/css',
    `${distPath}/static/css`,
    {
      rename: function(target) {
        if (path.basename(target).includes('.css')) {
          const { resultFilePath, mapFileName, fileName } = getFilePath(target);
          cssMap[fileName] = mapFileName;
          return resultFilePath;
        }
        return target;
      }
    },
    function(err) {
      if (err) console.log(err);
      /* 写入cssMap数据，用于prod下文件名映射 */
      fs.writeJSONSync(`${distPath}/static/rev/css-map.json`, cssMap);
      console.log('copy static css folder success');
    }
  );
}

function copyPublicFiles(distPath) {
  /* 拷贝其余静态资源 */
  ncp('public', `${distPath}/public`, function(err) {
    if (err) console.log(err);
    console.log('copy public resource folder success');
  });
}

const webpackConfig = configProducer('production');
const compiler = webpack(webpackConfig);
// console.log(webpackConfig);
compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
  console.log('build success');
  /* 创建日志目录 */
  fs.ensureDirSync(path.resolve(__dirname, '../logs'));
  fs.ensureDirSync(path.resolve(__dirname, '../logs/pm2'));
  fs.ensureDirSync(path.resolve(__dirname, '../logs/default'));
  fs.ensureDirSync(path.resolve(__dirname, '../logs/api'));
  copyFiles();
  /* 生成记录打包时间的json文件 */
  const buildTime = new Date();
  fs.writeJsonSync(path.resolve(__dirname, '../dist/static/rev/date.json'), {
    buildDate: `${buildTime.toLocaleDateString()} ${buildTime.toLocaleTimeString()}`
  });
});
