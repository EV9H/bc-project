import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button } from 'antd'
// CSS
import '../css/styles.css'


// "NOTES" are used in the tutorials so it is here. Model for notes defined in backend and will be changed for our need
const HomePage = () => {
  let {authTokens, logoutUser} = useContext(AuthContext)
  // let [notes, setNotes] = useState([])

  // useEffect(()=>{
  //   getNotes()
  // }, [])

  // let getNotes = async() => {
  //   let response = await fetch('http://127.0.0.1:8000/api/notes/',{
  //     method: 'GET',
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + String(authTokens.access)
  //     }
  //   })

  //   let data = await response.json()
    

  //   if(response.status === 200){
  //     setNotes(data)
  //   }else if(response.statusText === 'Unauthorized'){
  //     logoutUser()
  //   }

  // }

  return (
    <div className='bg3' id = "home-page" >
      <p className = "white">You are logged in to the Home Page!</p>
      <div className = "card-container">
        <div className = "card white">
          <h3> 已完成功能 </h3>
          <ul>
            <li>登陆</li>
          </ul>
          
        </div>
        <div className = "card white">
          <h3> TO-DO 功能 </h3>
          <ul>
            <li>注册</li>
            <li>词汇库</li>
            <li>账户-specific 词语完成量</li>
          </ul>
        </div>
      </div>
      

      
      
      {/* <ul>
          {notes.map(note => (
            <li key = {note.id}>{note.body}</li>
          ))}
      </ul> */}
    </div>
  )
}

export default HomePage