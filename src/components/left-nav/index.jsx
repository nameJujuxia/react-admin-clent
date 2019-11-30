import React, {Component} from 'react';
import './index.less';
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const {SubMenu} = Menu;

class LeftNav extends Component {

  /*根据指定menu数据数组生成<Menu.Item>和<SubMenu>的数组; reduce + 函数递归*/
  getMenuNodesWithReduce = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        /*
        判断当前item的key是否是我需要的openKey
        查找item的所有children中cItem的key，看是否有一个跟请求的path匹配
         */
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodesWithReduce(item.children)}
          </SubMenu>
        )
      }
      return pre
    }, [])
  }

  /*根据指定menu数据数组生成<Menu.Item>和<SubMenu>的数组; map + 函数递归*/
  getMenuNodesWithMap = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodesWithMap(item.children)}
        </SubMenu>
      )
    })
  }

  /*
  第一次render()之后执行一次。执行异步任务：发ajax请求；启动定时器
  */
  componentDidMount() {
  }

  /*
  第一次render()之前执行一次。为第一次render()做一些同步的准备工作
  */
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodesWithReduce(menuList)
  }


  render() {
    console.log("left-nav render")
    // 得到当前请求的路由路径
    const selectKey = this.props.location.pathname;

    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="" />
          <h1>后台管理系统</h1>
        </Link>
        {/*defaultSelectedKeys: 总是根据第一次指定的Key进行显示
         selectedKeys： 总是根据最新指定的Key进行显示*/}
        <Menu
          selectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

// 向外暴露，使用高阶组件withRouter()来包装非路由组件
// 新组件想LeftNav传递了3个特别属性: history/location/match
// 结果：LeftNav可有操作路由相关语法了
export default withRouter(LeftNav);

/*
两个问题：
1). 默认选中对应的MenuItem
2). 有可能需要默认打开某个SubMenu：即访问某个二级菜单项对应的path 
 */
