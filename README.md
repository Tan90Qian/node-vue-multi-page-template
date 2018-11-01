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

## precommit

husky 在 git commit 前对暂存区文件进行代码校验

## dev

开启 express 开发环境服务器并对模板引用的 scss 文件进行编译监听

## node-dev

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

通过 pm2 开启 express 生产环境服务器

## delete

关闭并清除 pm2 中的项目应用

## lint

全局校验代码

## lint:fix

全局校验代码并进行简单修复

## lint-style

校验`.scss`和`.vue`文件中的样式

## lint-style:fix

校验`.scss`和`.vue`文件中的样式，并进行简单修复

## lint-staged

执行 package.json 文件底部的校验规则，用于`precommit`钩子

## prettier

格式化 views 目录下的`.scss`、`.js`、`.vue`文件以及 controllers 目录下的`js`文件
