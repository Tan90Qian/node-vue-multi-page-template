import fs from 'fs-extra';
import path from 'path';

// app: express instance
function applyWebpackMiddlewares(app) {
  const configProducer = require('../scripts/webpack-config/config-producer').default;
  const webpack = require('webpack');
  const middleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackFolder = require('../scripts/webpack-config/path').default;

  const config = configProducer('development');
  const compiler = webpack(config);
  app.use(redirectHotReload);
  app.use(
    middleware(compiler, {
      watchOptions: {
        poll: true
      },
      // publicPath: `/${webpackFolder.distFolder}/`
      publicPath: '/'
      // writeToDisk: true
      // webpack-dev-middleware options
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

/* 重定向hot-update文件保证热更新 */
function redirectHotReload(req, res, next) {
  if (req.url.match(/hot-update.js(on)?$/)) {
    const urlArray = req.url.split('/');
    if (urlArray.length > 2) {
      const lastPart = urlArray.slice(-1)[0];
      res.redirect(`/${lastPart}`);
    } else {
      next();
    }
  } else {
    next();
  }
}

function getFilePath(filePath, map) {
  const filePathArray = filePath.split('/');
  const relativePath = filePathArray.slice(0, -1).join('/');
  const [fileNameWithPostfix = ''] = filePathArray.slice(-1);
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
      }
    };
    originRender.call(res, view, data, callback);
  };
  next();
}

// app: express instance
export default function(app) {
  const mode = process.env.NODE_ENV || 'production';
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
          mode,
          JSON: JSON,
          getCssFileName(filePath) {
            return getFilePath(filePath, cssMap);
          },
          getJsFileName(filePath) {
            return getFilePath(filePath, jsMap);
          }
        };
        originRender.call(res, view, data, callback);
      };
      next();
    }
  }
}
