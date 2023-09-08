import React, {useContext, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

// ANT DESIGN 
import  {Button, Layout, Space, Menu, theme} from 'antd'
import { SettingOutlined, UserOutlined, GoldFilled } from '@ant-design/icons';

// CSS
import '../css/styles.css'
const { Header, Content, Sider } = Layout;

const items = [
  {
    label: '主页',
    key: '',
  },
  {
    label: '教程',
    key: 'tutorial',
  },
  {
    label: '开始',
    key: 'start',
  },
  {
    label: '无',
    key: 'enroll',
  },
  {
    label:'管理',
    key: 'manage',
  }
];


const Header__ = () => {
  const [current, setCurrent] = useState('');
  let href=window.location.href.split('/')
  href=href.at(-1)
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate("/"+e.key)
    setCurrent(e.key);
  };



  return (
    <Layout>
      <Header className = 'header' style = {{display: 'inline-flex', background:'linear-gradient(90deg, rgb(121,195,0),rgb(44,128,226))'}} >
        
        <Menu className = "header-menu" style = {{background:'transparent', color:'white', flex: '1', justifyContent:'center'}} onClick={onClick} defaultSelectedKeys={['']} selectedKeys={[href]} mode="horizontal" items={items}/>
        
        {/* {user && <p style= {{color: 'blue', marginLeft: 100 }}>Hello,  <Link to ="/account" style = {{color: 'white'}} >{user.username} </Link></p>} */}
        <Menu  className = "account-menu-option"  onClick={(e) => navigate("/"+e.key) } mode="horizontal" 
          items={[  {
                      label: '',
                      key: 'account',
                      icon:<UserOutlined />
                    },
                ]}
          style = {{background:'transparent', color:'white'}}
        />
        
      </Header>
    </Layout>
    


  )
}

export default Header__