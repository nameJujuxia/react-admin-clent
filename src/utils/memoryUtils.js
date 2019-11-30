/*
用来在内存中保存一些数据的工具模块
 */
import storageUtils from "./storageUtils";

export default {
  //用来保存当前登录成功的user
  // 出啊是值为从localStorage中读取的user
  user: storageUtils.getUser()
}
