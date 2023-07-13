import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, ConfigProvider} from 'antd';

import {Link, useNavigate} from 'react-router-dom'

// CSS
import '../css/styles.css'
import '../css/login.css'
import DataContext from '../context/DataContext';

/* <form onSubmit={loginUser}>
    <input type = "text" name = "username" placeholder='Enter Username'/>
    <input type = "password" name = "password" placeholder='Enter Password'/>
    <input type = "submit"/>
</form> */

const CreateClassForm = () => {

  let {createClass} = useContext(DataContext)
  
  const onFinish = async (values) => {
    // console.log('Received values of form: ', values.username);
    createClass(values);
  };
  return (
      
      <Form
      name="create-class"
      className="login-form"

      onFinish={ (values) => onFinish(values)}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your class name!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="班级名称" className='input-field'/>
      </Form.Item>
      <Form.Item
        name="password"
        // rules={[
        //   {
        //     required: false,
        //     message: 'Please input your Password!',
        //   },
        // ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="加入密码"
        />
      </Form.Item>
      <Form.Item
        name="description"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="description"
          placeholder="描述"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" >
          创建
        </Button>
      </Form.Item>
    </Form>
       
        
    )
  }
  
  export default CreateClassForm