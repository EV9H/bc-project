import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space} from 'antd';

import LoginForm from '../components/SignupForm';
import '../css/login.css'

const SignupPage = () => {
  return (   
    <div id = "login-page">                             
      <Space id = "signup-box">
          <LoginForm/>
      </Space>
  </div>
  )
}

export default SignupPage