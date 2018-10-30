import fs from 'fs-extra';
import path from 'path';

/**
 * parse mode from command lines (env=xxx), default value is 'production'
 * @return {string} 'development' | 'production'
 */
function parseMode() {
  const defaultVal = 'production';
  const theFields = process.argv.filter(a => a.slice(0, 4) === 'env=');
  if (theFields.length < 1) return defaultVal;
  const [,val] = theFields[theFields.length - 1].split('=');
  if (val !== 'development' && val !== 'production') return defaultVal;
  else return val;
}

// app: express instance
function applyWebpackMiddlewares(app) {
  const configProducer = require('../scripts/webpack-config/config-producer').default;
  const webpack = require('webpack');
  const middleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackFolder = require('../scripts/webpack-config/path').default;

  const config = configProducer('development');
  const compiler = webpack(config);
  app.use(middleware(compiler, {
    watchOptions: {
      poll: true
    },
    // publicPath: `/${webpackFolder.distFolder}/`
    publicPath: '/js/'
    // writeToDisk: true
    // webpack-dev-middleware options
  }));
  app.use(webpackHotMiddleware(compiler));
}

function getFilePath(filePath, map) {
  const filePathArray = filePath.split('/');
  const relativePath = filePathArray.slice(0, -1).join('/');
  const [fileNameWithPostfix = ''] = filePathArray.slice(-1)
  const [fileName] = fileNameWithPostfix.split('.');
  const target = map[fileName];
  if (target) {
    return `${relativePath}/${target}`;
  }
  return filePath;
}

/**
 * overload res.render function
 * append mode = "development" to view data
 * @param {request} req
 * @param {response} res
 * @param {function} next middle ware function
 */
function addModeToRender(req, res, next) {
  const originRender = res.render;
  res.render = function(view, data, callback) {
    data = { 
      ...data,
      mode: 'development',
      JSON: JSON,
      getCssFileName(filePath) {
        return filePath;
      },
      getJsFileName(filePath) {
        return filePath;
      },
    };
    originRender.call(res, view, data, callback);
  }
  next();
}

// app: express instance
export default function(app) {
  const mode = parseMode();
  if (mode === 'development') {
    applyWebpackMiddlewares(app);
    app.use(addModeToRender);
  } else {
    /* 获取cssMap数据 */
    const cssMap = fs.readJsonSync(path.resolve(__dirname, '../static/rev/css-map.json'));
    const jsMap = fs.readJsonSync(path.resolve(__dirname, '../static/rev/js-map.json'));

    app.use(addCommonFeatureToRender);

    function addCommonFeatureToRender(req, res, next) {
      const originRender = res.render;
      res.render = function(view, data, callback) {
        data = { 
          ...data,
          JSON: JSON,
          getCssFileName(filePath) {
            return getFilePath(filePath, cssMap);
          },
          getJsFileName(filePath) {
            return getFilePath(filePath, jsMap);
          }
        };
        originRender.call(res, view, data, callback);
      }
      next();
    }
  }
}


