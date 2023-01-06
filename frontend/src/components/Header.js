import React, {useContext} from 'react'
import {Link, Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button, Space} from 'antd'

// CSS
import '../css/styles.css'
const linkStyle = {
  textDecoration: "none",
  color: 'white',
  width: 100
};

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div id = 'header' className = "bg4">
        <Space id = "logo">
            <h1>LOGO</h1>
        </Space>
        <Space wrap id = "button-list">
            <Link to = "/" style = {linkStyle}><Button ghost>Home</Button> </Link>
            <Link to = "/tutorial" style = {linkStyle}><Button ghost>Tutorials</Button> </Link>
            <Link to = "/start" style = {linkStyle}><Button ghost>Start</Button></Link>
        
            {user 
            ? <Button type = 'link' onClick={logoutUser} style = {linkStyle}>Logout</Button>
            : <Link to = "/login" style = {linkStyle}><Button ghost>Login</Button></Link>
            
            }
            {user && <p style= {{color: 'white', marginLeft: 100 }}>Hello,  <Link to ="/account" style = {{color: 'white'}} >{user.username} </Link></p>}

        </Space>

    </div>
  )
}

export default Header