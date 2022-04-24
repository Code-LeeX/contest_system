import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api/rqapi';
import './Login.css';

export default function Register() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    if(/^\d+$/.test(values.username)===false) {message.error('一卡通号格式有误');return;}
    registerApi({
      card_id:values.username,
      psw:values.password
    }).then(res=>{
      if(res["statusCode"]===1){message.error('该一卡通号已注册过');return;}
      if(res["statusCode"]===2){message.error('不存在该一卡通号');return;}
      else {message.success('注册成功');setTimeout(() => {navigate('/login')}, 200);return;}
    })
  };

  const gologin = ()=>{
    setTimeout(() => {
      navigate('/login')
    }, 200);
  }

  return (
    <div className="login">
      <div className="login_box">
        <h2>欢迎注册诚信教育答题系统</h2>

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


          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100px' }}>
              注册
            </Button>
            <Button type="primary" className="login-form-button" style={{ float: 'right', width: '100px' }} onClick={gologin}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
