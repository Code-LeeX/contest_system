import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import store from '../store/index';
import { loginApi } from '../api/rqapi';
import './Login.css';

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    if (/^\d+$/.test(values.username) === false) { message.error('一卡通号格式有误'); return; }
    loginApi({
      card_id: values.username,
      psw: values.password
    }).then(res => {
      if (res["statusCode"] === 0||res["statusCode"] === 3) { message.error('账号或密码有误'); return; }
      else if(res["statusCode"] === 2){
        message.success('管理员登录成功，欢迎！');
        setTimeout(() => { navigate('/admin') }, 200);
        window.localStorage.setItem('admin_id',values.username)
        return;
      }
      else {
        message.success('登录成功，欢迎！');
        setTimeout(() => { navigate('/chapters') }, 200);
        store.dispatch({
          type: 'change_stu_id',
          value: parseInt(values.username)
        })
        return;
      }
    })
  };

  const goregist = () => {
    setTimeout(() => {
      navigate('/register')
    }, 200);
  }

  return (
    <div className="login">
      <div className="login_box">
        <h2>欢迎登录诚信教育答题系统</h2>

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入一卡通号!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入一卡通号" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100px' }}>
              登录
            </Button>
            <Button type="primary" className="login-form-button" style={{ float: 'right', width: '100px' }} onClick={goregist}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
