import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";

class Admin extends Component {
  render() {
    // 读取保存的user，如果不存在，直接跳转到登录界面
    // const user = storageUtils.getUser();
    const user = memoryUtils.user
    //如果内存中没有存user ==> 说明当前没有登录
    if (!user || !user._id) {
      //  跳转到登录界面(在render中)
      return <Redirect to='/login' />
    }
    return (
      <div>
        Hello {user.username}
      </div>
    );
  }
}

export default Admin;
