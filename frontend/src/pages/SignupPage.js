import React from 'react'

import {Space} from 'antd';

import SignupForm from '../components/SignupForm';
import '../css/login.css'

const SignupPage = () => {
  return (   
    <div id = "login-page">                             
      <Space id = "signup-box">
         <SignupForm/>
      </Space>
  </div>
  )
}

export default SignupPage