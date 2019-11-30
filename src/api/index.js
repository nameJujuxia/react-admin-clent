/*
包含应用中n个接口请求函数的模块
每个函数返回Promise
 */
import ajax from "./ajax";

// const BASE = 'http://localhost:5000'
const BASE = ''

// export function reqLogin() {
//   return ajax('/login', {username, password}, 'POST');
// }

//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
