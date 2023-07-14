import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, ConfigProvider} from 'antd';

import {Link, useNavigate} from 'react-router-dom'

// CSS
import '../css/styles.css'
import '../css/login.css'
import DataContext from '../context/DataContext';



const JoinClassForm = () => {

  let {joinClass} = useContext(DataContext)
  
  const onFinish = async (values) => {
    // console.log('Received values of form: ', values.username);
    
    values.name = localStorage.getItem("selectedClass")
    let success = await joinClass(values)
    if(success){
      alert("加入成功")
    }else{
      alert("密码错误")
    }
    // if(!joinClass(values)){
    //     alert("失败")
    // }else{
    //   alert("加入成功")
    // }
  };
  return (
      
      <Form
      name="create-class"

      onFinish={ (values) => onFinish(values)}
      
    >
      <Form.Item
        name="className"
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
        name="classPassword"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="加入密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" >
          加入
        </Button>
      </Form.Item>
    </Form>
       
        
    )
  }
  
  export default JoinClassForm