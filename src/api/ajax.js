/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是Promise对象
优化1：统一处理请求异常 => 在外层包一个自己创建的promise对象
              => 在请求出错时候，不去reject(error)，而是显示错误信息
优化2：异步得到的不是response ,而是response.data
      在请求成功resolve时候，resolve(response.data)
 */
import axios from 'axios'
import {message} from "antd";


export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    //  1.执行异步Ajax请求
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      });
    } else {
      promise = axios.post(url, data);
    }

    promise.then((response) => {
      //  2.如果成功了，调用resolve(value)
      resolve(response.data)
    }).catch((error) => {
      //  3.如果失败了，不调用reject(reason)，而是提示异常信息
      // reject(error)
      message.error('请求出错了: ' + error.message)
    })

  })

}
