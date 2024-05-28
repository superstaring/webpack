# webpack5

## 使用watch mode（观察模式）

在每次编译代码时，手动运行npx webpack会显得很麻烦。

我们可以在webpack启动时添加watch参数，如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建。

`npx webpack --watch`

开发环境推荐使用`cheap-module-source-map`

