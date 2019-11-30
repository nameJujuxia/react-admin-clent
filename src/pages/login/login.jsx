import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import './login.less';
import logo from '../../assets/images/logo.png'
import {Button, Form, Icon, Input, message} from 'antd';
import {reqLogin} from "../../api";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";

const Item = Form.Item

class Login extends Component {

  // 自定义验证规则
  validatorPwd = (rule, value, callback) => {
    if (!value) {
      callback("密码必须输入")
    } else if (value.length < 4) {
      callback("密码长度不能小于4位")
    } else if (value.length > 12) {
      callback("密码长度不能大于12位")
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须由英文,数字或下划线组成")
    } else {
      callback()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //对所有表单字段验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("提交登录的Ajax请求", values)
        const {username, password} = values
        const result = await reqLogin(username, password)
        if (result.status === 0) {
          //将用户信息保存到localStorage中
          const user = result.data
          storageUtils.saveUser(user)
          // 保存到内存中
          memoryUtils.user = user
          //  调整到管理界面(不需要回退到登录界面)
          this.props.history.replace('/')
          message.success('登录成功')
          
        } else {
          message.error(result.msg)
        }
      } else {
        console.log("校验失败")
      }
    });
  }

  render() {
    // 从localStorage中读取保存的user，如果存在，直接跳到管理界面
    // const user = storageUtils.getUser()
    // 直接通过memoryUtils读取user,
    const user = memoryUtils.user
    if (user._id) {
      // 自动跳转到指定的路由路径
      return <Redirect to="/" />
    }
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>React后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                //声明式验证
                getFieldDecorator('username', {
                  rules: [
                    {required: true, whitespace: true, message: '用户名必须输入'},
                    {min: 4, message: '用户名至少四位'},
                    {max: 12, message: '用户名至多12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由英文,数字或下划线组成'}],
                })(
                  <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                    placeholder="用户名"
                  />
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.validatorPwd
                    }
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
