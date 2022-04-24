import React, { Component } from 'react'
import { Layout, message } from 'antd'
import { Outlet, Navigate } from 'react-router-dom'
import seulogo from './assets/images/logo.png'
import Aside from './components/Aside';


export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     inputValue: '',
  //     list: store.getState().list  //公共state中的list
  //   }
  //   // 监听store变化
  //   store.subscribe(this.handleStoreChange);
  // }
  constructor(props) {
    super(props)
    if (!window.localStorage.getItem('STU_id')) this.state = { gologin: true }
    else this.state = { gologin: false }
  }

  logout = ()=>{
    message.success('退出成功，即将返回登录页...')
    window.localStorage.clear();
    setTimeout(() => {
      this.setState({ gologin: true });
    }, 600);
  }

  render() {
    return (
      <div>
        {this.state.gologin ? <Navigate to="/login" /> : ''}
        <Layout id='app'>
          <header>
            <img src={seulogo} height="64px" alt='logo' />
            <h2>东南大学诚信教育答题系统</h2>
            <div>{window.localStorage.getItem('STU_id')}
              &nbsp;&nbsp;
              <span className="logout" onClick={this.logout}>退出登录</span>
            </div>
          </header>
          <div className='middleContainer'>
            <Aside />
            <div className="middleContent_box">
              <Outlet />
            </div>
          </div>
          <footer>Respect Copyright &copy; seu</footer>
        </Layout>
      </div>
    )
  }
}
