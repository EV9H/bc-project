import React, {useContext,useState,useEffect} from 'react'

import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button } from 'antd'
// CSS
import '../css/styles.css'
import DataContext from '../context/DataContext';



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
  
  useEffect( () => {
    getProfile()
    .then(setName(profile.name))
    .then(setBio(profile.bio))
    .then(console.log(name, bio))
    .then(console.log(profile.name))
    .then(setReady(true))
  },[])
  
  return (
    <div className = "bg3 white" id = "account-page">
      <p className = "white">我的账户</p>
      {/* <p className = "white">姓名：{profile.name}</p> */}
      {/* <p className = "white">个人简介：{profile.bio}</p> */}
      {user && <p> 用户名: {user.username}</p>}
      
      <form>
        <label>
          姓名:
        </label>
        
        {ready && <input type = "text" defaultValue = {profile.name} onChange={(e) => setName(e.target.value)}/>}
        <label>
        个人简介:
        </label>
        {ready && <input type = "text" defaultValue = {profile.bio} onChange={(e) => setBio(e.target.value)}/>}
        
        <button type = 'submit' onClick={ () => {editProfile(user,name, bio)} }> SUBMIT</button>
      </form>
      <p>班级：</p>
      <p>进度：</p>

      {user &&  <button onClick={logoutUser}>登出</button>}
    </div>
  )
}

export default AccountPage