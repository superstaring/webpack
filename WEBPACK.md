# webpack5

## 使用watch mode（观察模式）

在每次编译代码时，手动运行npx webpack会显得很麻烦。

我们可以在webpack启动时添加watch参数，如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建。

`npx webpack --watch`

开发环境推荐使用`cheap-module-source-map`

## @babel/polyfill

`npm i -D babel-loader @babel/core @babel/preset-env`

`npm install -D core-js@3`

不用在页面中引入@babel/polyfill

## 启动本地服务

`npx http-server` 通常访问本地html页面。

## 发布为npmpackage

1. `npm config get registry` 输出为https://registry.npmjs.org，才为连接到了npm官网。

2. `npm adduser` 输入用户名密码邮箱

3. `npm publish` 发布成功，包名为packgae.json中的name名称。

4. package.json中的main值设置为dist/webpack-numbers。

## 开发环境配置devtool

"eval"具有最好的性能，但并不能帮助你转义代码。

大多数情况下，最佳选择是`eval-cheap-module-source-map`

## 模块联邦

```
const { ModuleFederationPlugin } = require("webpack").container;

// Header
plugins:[
    new ModuleFederationPlugin({
        name: "home",
        filename: "remoteEntry.js",
        remotes: {
            // 引用其它应用导出的组件
            nav: "nav@http://localhost:3003/remoteEntry.js",
        },
        exposes:{
            // 暴露出去的模块：其它模块引用-当前的路径
            "./Header": "./src/Header.js",  
        },
        shared: {
            // 共享的模块
        }
    })
]

// nav
plugins:[
    new ModuleFederationPlugin({
        name: "home",
        filename: "remoteEntry.js",
        remotes: {
            // 引用其它应用导出的组件
            nav: "nav@http://localhost:3003/remoteEntry.js",
        },
        exposes:{
        },
        shared: {
        }
    })
]

// 使用
import("nav/Header").then((Header)=>{
    // Header
    document.body.appendChild(Header.default());
})
```

## 提升构建性能

通用环境、开发环境、性能环境。

1.更新到最新版本：webpack、node

2.将loader应用于最少数量的必要模块：比如使用include、exclude

3.引导：每个额外的loader/plugin都有启用时间，尽量少的使用工具。

4.解析：resolve,减少使用条目的数量。

5.小即是快：减少编译结果的整体大小，以提高构建性能。尽量保持chunk体积小。

- 使用数量更少、体积更小的library.
- 在多页面应用程序中使用SplitChunksPlugin，并启用async模式.
- 移除未引用的代码.
- 只编译你当前正在开发的代码.

6.使用持久化缓存

```
cache:{
    type:"memory"
}
```

7.自定义plugin/loader：对它们进行概要分析，以免在此处引入性能问题。
