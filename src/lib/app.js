/*
 * @Author: your name
 * @Date: 2020-10-29 16:05:23
 * @LastEditTime: 2020-10-30 14:09:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-sdk/src/lib/app.js
 */
const Bmob = global.Bmob || {}

Bmob.Echo = ()=>{
  return 'sdk 开发入门'
}
window.Bmob = Bmob
module.exports = Bmob