import React, {useContext} from 'react'

import AuthContext from '../context/AuthContext'
// ANT DESIGN 
import {Button } from 'antd'
// CSS
import '../css/styles.css'

const AccountPage = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className = "bg3" id = "account-page">
      <p className = "white">AccountPage</p>
      {user &&  <Button type = 'link' onClick={logoutUser} style = {{textDecoration: "none", color: 'white',width: 100}}>Logout</Button>}
    </div>
  )
}

export default AccountPage