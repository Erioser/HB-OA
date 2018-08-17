import React, { Component } from 'react';
import connect from './modules/connect'
import { withRouter } from 'react-router-dom'

import SpinLoaidng from './components/SpinLoading'

class App extends Component {

  state = {
    isLoading: false
  }

  componentWillReceiveProps (props) {
    //当路由切换的时候
    let {pathname} = props.location
    if ( pathname !== this.props.location.pathname ) {
      this.checkLogin(props)
    }

    if ( pathname !== this.props.location.pathname ) {
      if (pathname === '/attend/leave-work') {
        
        if ( props.commons.user_state.level < 7 ) {
          alert('没有权限')
          this.props.history.go(-1)
        }
      }   
    }

  }

  componentWillMount () {
    //进入项目后就去获取用户登录状态
    this.props.commons_actions.get_initial_user_state(() => {
      //当直接进入某个路由的时候判断是否登录
      this.checkLogin(this.props)
    })

    

    //为bus绑定事件
    this.bus.on('change-loading', (bool) => {
      console.log('更改， ',!this.state.isLoading)
      this.setState({ isLoading: bool })
    })

  }

  checkLogin (props) {//登录判断函数
    let { commons, history } = this.props
    if ( props.location.pathname !== '/login') {
      if ( !commons.user_state ) {
        history.replace('/login')
      }
    }
  }

  render() {
    let { isLoading } = this.state
    return (
      <div className="App">
         {this.props.children}

         <SpinLoaidng loading = { isLoading } />
      </div> 
    );
  }
}

export default withRouter(connect(App, 'commons'));

// ant-spin