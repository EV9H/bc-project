import React from 'react'

import { Space} from 'antd';

import LoginForm from '../components/LoginForm';
import '../css/login.css'

const LoginPage = () => {
  return (   
    <div id = "login-page">                             
      <Space id = "login-box">
          <LoginForm/>
      </Space>
  </div>
  )
}

export default LoginPage