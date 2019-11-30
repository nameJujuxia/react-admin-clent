import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Modal} from 'antd'
import './index.less';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import LinkButton from '../link-button'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sysTime: formateDate(Date.now()),
      dayPictureUrl: '', // 天气图片的 url
      weather: ''
    }
  }

  componentDidMount() {
    this.getSysTime()
    this.getWeather()
  }

  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  //退出登录
  logout = () => {
    //  显示确认提示
    Modal.confirm({
      title: '退出登录',
      content: '确认退出吗？',
      onOk: () => {
        console.log('OK');
        //  确认后，删除存储的用户信息
        storageUtils.removeUser()
        memoryUtils.user = {}
        //  跳转到登录界面
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 根据请求的 path 得到对应的标题
  // 判断父元素是否匹配  如果有children  在查找子元素是否匹配
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname;
    menuList.forEach(item => {
      // 如果当前item对象的key与path一样,item的title就是需要显示的title
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        // 如果有值才说明匹配
        if (cItem) {
          title = cItem.title
        }
        // item.children.forEach(cItem => {
        //     if(path.indexOf(cItem.key) === 0) {
        //         title = cItem.title
        //     }
        // })
      }
    })
    return title
  }

  // 启动循环定时器, 每隔 1s 更新一次 sysTime
  getSysTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: formateDate(Date.now())
      })
    }, 1000)
  }

  // 发异步 ajax 获取天气数据并更新状态
  getWeather = async () => {
    //发请求
    const {dayPictureUrl, weather} = await reqWeather('北京')
    //更新状态
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  render() {
    const user = memoryUtils.user;
    const title = this.getTitle();
    // 数据解构赋值
    const {sysTime, dayPictureUrl, weather} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {user.username} &nbsp; &nbsp;</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{sysTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
