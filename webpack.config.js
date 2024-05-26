const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 提取 css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 将提取后的css代码进行压缩
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
// 打包模式的应用
const isProd = process.env.NODE_ENV === "production";
const webpack = require("webpack");

const config = {
  // mode: "development",
  // 资源地图
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./index.js",
    clean: true, // 生成打包后内容之前，清空输出目录
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在webpack@5中，可以使用`...`语法来扩展现有的minimizer(即`terser-webpack-plugin`)，将下一行取消注释，保证js代码还能压缩处理。
      `...`,
      new CssMinimizerWebpackPlugin(),
    ],
    // 分割公共代码
    splitChunks: {
      chunks: "all", // 所有模块动态非动态移入的都分割分析
      cacheGroups: {
        // 分隔组
        commons: {
          // 抽取公共模块
          minSize: 0,
          minChunks: 2,
          reuseExistingChunk: true,
          name(module, chunks, cacheGroupKey) {
            const allChunksNames = chunks.map((item) => item.name).join("~");
            return `./js/${allChunksNames}`;
          },
        },
      },
    },
  },
  resolve: {
    // webpack 解析别名 alias
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: path.resolve(__dirname, "dist/index.html"),
      useCdn: process.env.NODE_ENV === "production", // 生产模式下使用cdn引入的地址
    }),
    new MiniCssExtractPlugin({ filename: "./css/index.css" }),
    // 注入环境变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (process.env.NODE_ENV === "production") {
  // 外部扩展，防止import引入的包被引入
  config.externals = {
    "bootstrap/dist/css/bootstrap.min.css": "bootstrap",
    // axios: "axios",
  };
}

module.exports = config;
