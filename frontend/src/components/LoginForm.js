import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, ConfigProvider} from 'antd';

// CSS
import '../css/styles.css'
import '../css/login.css'

/* <form onSubmit={loginUser}>
    <input type = "text" name = "username" placeholder='Enter Username'/>
    <input type = "password" name = "password" placeholder='Enter Password'/>
    <input type = "submit"/>
</form> */

const LoginForm = () => {
    let {loginUser, loginUserAnt} = useContext(AuthContext)
    
    const onFinish = async (values) => {
      console.log('Received values of form: ', values.username);
      loginUserAnt(values);
    };
    return (
        <ConfigProvider
          theme={{
              token: {
                  colorPrimary: '#00b96b',
              },
              }}
        >
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={ (values) => onFinish(values)}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className='input-field'/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
  
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" >
                Log in
              </Button>
            </Form.Item>
            
              Or <a href="">register now!</a>

          </Form>
        </ConfigProvider>
        
    )
  }
  
  export default LoginForm