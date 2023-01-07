import React, {useState, useEffect, useContext}from 'react'
import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button, Space } from 'antd'
// CSS
import '../css/styles.css'

const TutorialPage = () => {
  let {authTokens, logoutUser} = useContext(AuthContext)
  let [meanings, setMeanings] = useState([])

  useEffect(()=>{
    getMeanings()
  }, [])

  let getMeanings = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/meanings/',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })

    let data = await response.json()
    if(response.status === 200){
      setMeanings(data)
    }
  }



  return (
    <div className = "bg3" id = "tutorial-page">
      <p className='white'>TutorialPage</p>
      <Space wrap className='card white'>
         <h3> 词库</h3>
         <ul>
            {meanings.map(m => (
               <li key = {m.id}> 词id: {m.word}, 词义：{m.name}, 例子： {m.example}, 词性：{m.attribute}, 发音：{m.pronounciation}</li>
            ))}
        </ul>
      </Space>
    </div>
  )
}

export default TutorialPage