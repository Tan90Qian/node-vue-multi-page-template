'use strict';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import webpack from 'webpack';
import path from 'path';

import webpackPath from './path';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const baseConfig = {
  resolve: {
    extensions: ['.vue', '.js', '.json'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    path: path.resolve(webpackPath.distPath, '../'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          // Loader will always return warnings if option is set to true
          emitWarning: true,
        },
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('../src')],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:7].[ext]',
          outputPath: process.env.NODE_ENV === 'production' ? '../dist/static/img/' : 'img/',
          publicPath: '/img/',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:7].[ext]',
          outputPath: process.env.NODE_ENV === 'production' ? '../dist/static/media/' : 'media/',
          publicPath: '/media/',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:7].[ext]',
          outputPath: process.env.NODE_ENV === 'production' ? '../dist/static/fonts/' : 'fonts/',
          publicPath: '/fonts/',
        },
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: true,
  },
  plugins: [new VueLoaderPlugin()],
};

export default baseConfig;
