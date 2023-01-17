const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const eslintWebpackPlugin = require("eslint-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name][contenthash].js",
  },
  module: {
    rules: [],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new eslintWebpackPlugin({
      context: path.resolve(__dirname, "src"),
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, ""),
      path.resolve(__dirname, "node_modules"),
    ],
  },
  devServer: {
    host: "127.0.0.1",
    port: 8001,
    open: true,
  },
  mode: "development",
  devtool: "cheap-module-source-map"
};
