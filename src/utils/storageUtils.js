/*
操作localStorage中数据的工具函数模块
 */
import store from 'store'

const USER_KEY = 'user_key'

export default {
  
  //保存user到localStorage
  saveUser(user){
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user) 
  },
  //返回一个user对象，如果没有就返回一个空对象{}
  getUser(){
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {}
  },

  //删除user到localStorage
  removeUser(){
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }
  
}

//https://github.com/marcuswestin/store.js store工具包的使用
// 以下为api
// // Store current user
// store.set('user', { name:'Marcus' })
//
// // Get current user
// store.get('user')
//
// // Remove current user
// store.remove('user')
//
// // Clear all keys
// store.clearAll()
//
// // Loop over all stored values
// store.each(function(value, key) {
//   console.log(key, '==', value)
// })
