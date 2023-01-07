import React, {useState, useEffect, useContext}from 'react'
import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button, Layout, Space, Row} from 'antd'
// CSS
import '../css/styles.css'

const TutorialPage = () => {
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
    <Layout id = "tutorial-page" style = {{minHeight: "80vh",}}>
      <h3 >教程页</h3>
      <Space wrap>
         <h3> 词库</h3>
         <ul>
            {meanings.map(m => (
               <li key = {m.id}> 词id: {m.word}, 词义：{m.name}, 例子： {m.example}, 词性：{m.attribute}, 发音：{m.pronounciation}</li>
            ))}
        </ul>
      </Space>
    </Layout>
  )
}

export default TutorialPage