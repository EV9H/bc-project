import React, {useState, useEffect, useContext}from 'react'
import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button, Layout, Space, Card,Popover, Table, Alert} from 'antd'
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
    console.log("Start fetching entries")
    const startTime = new Date();
    let response = await fetch('http://127.0.0.1:8000/api/allentry/',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })

    let data = await response.json()
    if(response.status === 200){
      setEntries(data)
      console.log("Entries Fetched, time used: " + ((new Date() - startTime)/1000))
    }else{
      alert("Something Wrong")
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
      }else{
        alert("Something wrong with words")
      }
  }

  const getEntriesFormattedForTable = (entries) =>{
      var result = entries.map(function (e) {
        return {
            ID: e.id,
            word: getWordByID(e.word),
            meaning: e.meaning,
            attribute: e.attribute
        };
      });
      return result 
  }

        
 
  const getWordByID = (id) => {
    return words.find(w => w.id === id).word
  }
  // const dataSource = entries.map(e => [
  //   {
  //   "id" : e.id, 
  //   "word": getWordByID(e.word),
  //   "attibute": e.attibute,
  //   "meaning": e.meaning
  //   }
  // ])

  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a, b) => a.ID - b.ID
    },
    {
      title: '词',
      dataIndex: 'word',
      key: 'word',
      sorter: (a, b) => a.word.charCodeAt(0) - b.word.charCodeAt(0)
    },
    {
      title: '词性',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: '解释',
      dataIndex: 'meaning',
      key: 'meaning',
    },
  ];

  return (
    <Layout id = "tutorial-page" style = {{minHeight: "80vh",}}>
      <h3 >教程页</h3>
      <Space wrap>
         <h3> 词库</h3>
         {/* <ul id = "word-list">
            {entries.map(e => (
              <Popover content = {e.meaning}>
                <Card>
                  <li key = {e.id}>{getWordByID(e.word)}({e.attribute})</li>
                </Card>
              </Popover>
            ))}
        </ul> */}
        <Table dataSource={getEntriesFormattedForTable(entries)} columns={columns} rowKey = "ID"/>;
      </Space>
    </Layout>
  )
}

export default TutorialPage