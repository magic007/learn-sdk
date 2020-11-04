/*
 * @Author: your name
 * @Date: 2020-10-30 14:19:41
 * @LastEditTime: 2020-11-04 16:07:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-sdk/config/pro.env.js
 */
const path = require('path');
const packageInfo = require('../package.json');
module.exports = {
  entry: './index.js',
  output: {
    filename: 'sdk-' + packageInfo.version + '.min.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd'
  }
};