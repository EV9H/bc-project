import React, {useContext,useState,useEffect} from 'react'

import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button, theme, Layout, Divider, Space, Row, Col, Avatar} from 'antd'
// CSS
import '../css/styles.css'
import DataContext from '../context/DataContext';
import { UserOutlined } from '@ant-design/icons';


const AccountPage = () => {
  let {user, logoutUser} = useContext(AuthContext)
  // let {backendAddress, authTokens} = useContext(AuthContext)

  let {profile,getProfile, editProfile} = useContext(DataContext)

  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [ready, setReady] = useState(false)
  // function handleSubmit(e){
  //   console.log("HANDLED SUBMIT")
  //     e.preventDefault();
  //     const form = e.target;
  //     const formData = new FormData(form);
  //     const formJson = Object.fromEntries(formData.entries());
  //     console.log(formJson);
  // }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect( () => {
    getProfile()
    .then(setName(profile.name))
    .then(setBio(profile.bio))
    .then(setReady(true))
  },[])
  
  return (
    <Layout style = {{minHeight: '95vh', background: colorBgContainer}}>


      
      <Space id = "account-page" style = {{background: colorBgContainer, display:'flex', flexDirection:'column'}}>
        <p>我的账户</p>
        {/* <p className = "white">姓名：{profile.name}</p> */}
        {/* <p className = "white">个人简介：{profile.bio}</p> */}
        {user && <p> 用户名: {user.username}</p>}
        <Avatar shape="square" size={64} icon={<UserOutlined />} />
        
        <Row span = {24}>
          <Col span = {12}>
            <Row span = {12} style = {{display:'flex', textAlign:'center'}}>
            姓名:
            {ready && <input type = "text" defaultValue = {profile.name} onChange={(e) => setName(e.target.value)}/>}
            </Row>
            <Row span = {12}>
            个人简介:
            {ready && <input type = "text" defaultValue = {profile.bio} onChange={(e) => setBio(e.target.value)}/>}
            </Row>
          </Col>
          

        </Row>
        
          <Button type = 'primary' onClick={ () => {editProfile(user,name, bio)} } > 保存</Button>
       
        
        
        <p>班级：</p>
        <p>进度：</p>

        {user &&  <Button type = 'primary' onClick={logoutUser}>登出</Button>}
      </Space>
    </Layout>
  )
}

export default AccountPage