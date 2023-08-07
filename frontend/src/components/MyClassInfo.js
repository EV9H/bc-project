import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, ConfigProvider, Space} from 'antd';

import {Link, useNavigate} from 'react-router-dom'

// CSS
import '../css/styles.css'
import DataContext from '../context/DataContext';



const MyClassInfo = (props) => {

  let {getClassDetail, classDetail} = useContext(DataContext)
  
  const [data, setData ] = React.useState('')

  const [nStudent, setNStudent] = React.useState('')

  const [studentList, setStudentList] = React.useState([])
  const [entryLibrary, setEntryLibrary] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  useEffect( () => {
    // const getData = async () => {
    //     console.log("FETCHED")
    //     setLoading(true)
    //     await getClassDetail(props.selectedClass)
    //     setData(classDetail)
    //     setLoading(false)
    // }
    // getData()

   
  },
  [])

  
  
  return (
      
      <Space style = {{}}>
        {loading &&
            <ul style = {{fontSize: 30,}}>
                <li>选择的班级：{props.selectedClass}</li>
                <li>名称： {props.data.name}</li>
                <li>描述： {props.data.description}</li>
                <li>人数： {nStudent}</li>
                <li>学生列表: {studentList}</li>
                <li>词库：{entryLibrary}</li>
            </ul>
        }
        
        
        
        
      </Space>
       
        
    )
  }
  
  export default MyClassInfo