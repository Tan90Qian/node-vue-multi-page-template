# 文件及文件夹功能说明

## app.js

node 的应用入口文件，用于启动 express 的开发服务器。

## postcss.config.js

postcss 的配置文件。

## controllers

控制器层的目录

## models

数据层的目录

## middlewares

express 的中间件目录，存放一些公用中间件

## scripts

node 及 webpack 相关脚本，用于打包等任务

## static

静态资源的目录

## views

视图层的目录

# package.json scripts 作用

## dev

开启 express 开发环境服务器

## sassc-dev

开发环境下编译 scss 文件，并`监听更新`（需另开一个进程）

## sassc

项目打包时编译 scss 文件

## clean

清空项目打包的目标目录（通过 babel-node）

## build

打包出生产环境下的代码，包括`清空已有打包目录`、`打包服务端相关代码`、`编译预处理css文件`、`打包浏览器端相关代码`等步骤

## build-server

打包服务端相关代码（通过 babel）

## build-client

打包浏览器端相关代码（通过 babel-node），包含`webpack打包vue框架相关代码`和`复制模板文件相关代码`两个步骤

## start

开启 express 生产环境服务器
