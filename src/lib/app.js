/*
 * @Author: your name
 * @Date: 2020-10-29 16:05:23
 * @LastEditTime: 2020-10-30 17:30:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-sdk/src/lib/app.js
 */
const Socket = require('./socket')

const Bmob = global.Bmob || {}

Bmob.Echo = ()=>{
  return 'sdk 开发入门1'
}

// Socket通讯
Bmob.Socket = (id) => new Socket(id)
Bmob.Socket = Socket
window.Bmob = Bmob
module.exports = Bmob