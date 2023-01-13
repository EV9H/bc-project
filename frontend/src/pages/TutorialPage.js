import React, {useState, useEffect, useContext}from 'react'
import AuthContext from '../context/AuthContext'
import DataContext from '../context/DataContext';

// ANT DESIGN 
import {Button, Layout, Space, Card,Popover, Table, Alert} from 'antd'
// CSS
import '../css/styles.css'


const TutorialPage = () => {
  // let [entries, setEntries] = useState([])
  // let [words, setWords] = useState([])
  // let [examples, setExamples] = useState([])
  let {entries, words, examples,
    getEntries, get_words, get_examples,
    getWordByID,getExampleByID,getExampleListByEntry,getEntriesFormattedForTable 
  } = useContext(DataContext)

  let {backendAddress} = useContext(AuthContext)

  // useEffect(()=>{
  //   getEntries()
  //   get_words()
  //   get_examples()
  // }, [])




  
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
    <Layout id = "tutorial-page" style = {{minHeight: "80vh", alignItems:'center',}}>
      <Space wrap align='center'>
        <ul>
            <h3>以每个字为单位显示</h3>
            <Space wrap align='center'>

            
            {words.map(w => (
              <Popover content = {<Card>X</Card>}>
              <Card style = {{margin: "4px"}}>
                <li key = {w.id}>{w.word}</li>
              </Card>
              </Popover>
            ))}
            </Space>
        </ul>
        
         
         <ul>
            <h3>以每个字意为单位显示</h3>
            <Space wrap align='center'>
              {entries.map(e => (
                  <Card title = {getWordByID(e.word)+ " / "+ e.attribute} style = {{width: "150px",}}>
                    <li key = {e.id}>  {e.meaning}</li>
                  </Card>
              ))}
            </Space>
            
        </ul>

        
        
      </Space>
      <div>
        <Space wrap align="center">
            <Table dataSource={getEntriesFormattedForTable(entries)} columns={columns} rowKey = "ID"
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { 
                      for(const r of getExampleListByEntry(record)){
                        console.log(r)
                      }
                  }
                };
              }}
              style = {{justifyContent:'center', width: '80vw', alignItems:'center',justifyItems:'center',justifyContent:'center',alignSelf:'center',alignContent:'center'}}
              />
          </Space>
      </div>
    </Layout>
  )
}

export default TutorialPage