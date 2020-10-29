/*
 * @Author: your name
 * @Date: 2020-10-29 16:05:23
 * @LastEditTime: 2020-10-29 16:42:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-sdk/src/lib/app.js
 */
const Bmob = global.Bmob || {}

Bmob.Echo = ()=>{
  return 1
}
window.Bmob = Bmob
module.exports = Bmob