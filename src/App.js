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
  }

  componentWillMount () {
    //当直接进入某个路由的时候判断是否登录
    this.checkLogin(this.props)

    //为bus绑定事件
    this.bus.on('change-loading', () => {
      this.setState({ isLoading: !this.state.isLoading })
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