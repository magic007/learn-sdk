/*
 * @Author: magic
 * @Date: 2020-10-29 18:00:58
 * @LastEditTime: 2020-10-30 17:20:38
 * @LastEditors: Please set LastEditors
 * @Description: 开发环境打包配置文件页面
 * @FilePath: /learn-sdk/config/dev.env.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口
  output: {
    filename: 'sdk.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(), // 打包前清理旧文件
    new HtmlWebpackPlugin({title: 'dev', filename: 'index.html', template: 'src/index.html'})
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    open: true,
    port: 9001,
    overlay: true
  }
};