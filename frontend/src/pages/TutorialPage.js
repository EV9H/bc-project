import React, {useState, useEffect, useContext}from 'react'
import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button, Layout, Space, Card,Popover} from 'antd'
// CSS
import '../css/styles.css'

const TutorialPage = () => {
  let [entries, setEntries] = useState([])
  let [words, setWords] = useState([])
  useEffect(()=>{
    getEntries().then(
      get_word_ids()
    )
  }, [])

  let getEntries = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/allentry/',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })

    let data = await response.json()
    if(response.status === 200){
      setEntries(data)
    }
  }
  let get_word_ids = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/id_word/',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
      },
      })

      if(response.status === 200){
        let words = await response.json()
        setWords(words)
      }
  }

  const getWordByID = (id) => {
    return words.find(w => w.id === id).word
  }

  return (
    <Layout id = "tutorial-page" style = {{minHeight: "80vh",}}>
      <h3 >教程页</h3>
      <Space wrap>
         <h3> 词库</h3>
         <ul>
            {entries.map(e => (
              <Popover content = {e.meaning}>
                <Card>
                  <li key = {e.id}>{getWordByID(e.word)}({e.attribute})</li>
                </Card>
              </Popover>
            ))}
        </ul>
      </Space>
    </Layout>
  )
}

export default TutorialPage