# webpack5

## 初始化

`npm init -y`

## 安装

`npm i webpack webpack-cli --save-dev`

## 打包入口和出口

默认为 `src/index.js、dist/main.js`

## 插件

`npm i html-webpack-plugin --save-dev`

## 加载器

`npm i css-loader style-loader --save-dev`

### 安装 bootstrap

`npm i bootstrap`

### 提取 css

`mini-css-extract-plugin` 不能和 style-loader 一起使用。

css 文件可以被浏览器缓存，减少 js 文件体积。

### 生产模式压缩

`css-minimizer-webpack-plugin`

## 打包 less 代码

加载器 less-loader,less 一起安装，`npm i less less-loader --save-dev`

## 打包图片

资源模块：webpack5 内置资源模块（字体，图片等打包），无需额外 loader。

## 搭建开发环境

`npm i webpack-dev-server --save-dev` 设置模式为开发模式`mode: development`，命令行设置的优先级高于配置文件中的，推荐用命令行中的。

## 打包模式的应用

借助`cross-env`（跨平台通用）包命令，设置参数区分环境

`npm i cross-env --save-dev`

```
"build": "cross-env NODE_ENV=production webpack --mode=production",
"dev": "cross-env NODE_ENV=development webpack serve --open --mode=development"
```

## 查看打包后的文件

vscode 的 live server 插件，打包生成的文件中右键预览。预览的是生产的页面。

## 注入环境变量

```
new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
}),
```

## 开发环境调错-source map

代码被压缩和混淆，无法正确定位源代码位置（行数和列数）

`devtool: "inline-source-map"`

inline-source-map 选项：把源码的位置信息一起打包在 js 文件内，可以准确追踪 error 和 warning 在原始代码的位置。

注意：source-map 仅适用于开发环境，不要在生产环境使用（防止被轻易查看源码的位置）。

## webpack 解析别名 alias

可以在前端使用，使用绝对路径。

`import index from "@/index.js"`

## 优化-CDN 使用

CDN：内容分发网络，指的是一组分布在各个地区的服务器。

作用：把静态资源文件/第三方库放在 CDN 网络中各个服务器中，供用户就近请求获取。

好处：减轻自己服务器请求压力，就近请求无力延迟低，配套缓存策略。

生产环境一般会购买 cdn

## 多页面打包

多页面：多个 html 页面，切换页面实现不同业务逻辑展示

## 分割公共代码

splitChunks
