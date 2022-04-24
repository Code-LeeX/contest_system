import React, { Component } from 'react'
import { Layout, message } from 'antd'
import { Outlet, Navigate } from 'react-router-dom'
import seulogo from '../assets/images/logo.png'
import Asideadmin from '../components/Asideadmin';
import { loginApi } from '../api/rqapi';


export default class Admin extends Component {
  state = { gologin: false }
  constructor(props) {
    super(props)
    if (!window.localStorage.getItem('admin_id')) {
      setTimeout(() => {
        this.setState({ gologin: true })
      }, 200);; return;
    }
    loginApi({
      card_id: window.localStorage.getItem('admin_id'),
      psw: 111
    }).then(res => {
      console.log(res);
      if (!(res["statusCode"] === 2 || res["statusCode"] === 3)) { this.setState({ gologin: true }) }
    })
  }

  logout = () => {
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
            <h2>诚信教育答题系统后台管理</h2>
            <div>{window.localStorage.getItem('admin_id')}
              &nbsp;&nbsp;
              <span className="logout" onClick={this.logout}>退出登录</span>
            </div>
          </header>
          <div className='middleContainer'>
            <Asideadmin />
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
