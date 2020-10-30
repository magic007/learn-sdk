/*
 * @Author: your name
 * @Date: 2020-10-30 14:19:41
 * @LastEditTime: 2020-10-30 14:21:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-sdk/config/pro.env.js
 */
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'sdk.js',
    path: path.resolve(__dirname, 'dist'),
  }
};