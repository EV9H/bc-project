import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space} from 'antd';

import LoginForm from '../components/LoginForm';
import '../css/login.css'

const LoginPage = () => {
  let {loginUser, loginUserAnt} = useContext(AuthContext)
  
  const onFinish = async (values) => {
    console.log('Received values of form: ', values.username);
    loginUserAnt(values);
  };
  return (
    
    <div id = "login-page">
                                  
      <Space id = "login-box">
          <LoginForm/>
      </Space>
    
  </div>
  )
}

export default LoginPage