/*
 * @Author: maigc
 * @Date: 2020-10-29 16:01:30
 * @LastEditTime: 2020-10-30 18:45:17
 * @LastEditors: Please set LastEditors
 * @Description: sdk 验证页面
 * @FilePath: /learn-sdk/src/index.js
 */
let Bmob = require('./lib/app')

console.log('进入测试页面')

console.log('Bmob', Bmob)

// 初始化socket 服务
let BmobSocketIo = new Bmob.Socket('6939cca7f50b0f983ad317727a913cd3')

// 订阅Chat表的数据更新事件
BmobSocketIo.onInitListen = function () {
  BmobSocketIo.updateTable("Chat");
};

// 监听服务器返回的更新表的数据
BmobSocketIo.onUpdateTable = function (tablename, data) {
  if (tablename == "Chat") {
    console.log('data', data);
  }
};

console.log(Bmob.Echo())