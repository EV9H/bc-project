import React, {useState, useEffect, useContext}from 'react'
import AuthContext from '../context/AuthContext'

// ANT DESIGN 
import {Button, Layout, Space, Card,Popover, Table, Alert} from 'antd'
// CSS
import '../css/styles.css'


const TutorialPage = () => {
  let [entries, setEntries] = useState([])
  let [words, setWords] = useState([])
  let [examples, setExamples] = useState([])
  let {backendAddress} = useContext(AuthContext)

  let getEntries = async() => {
    console.log("Start fetching entries") 
    const startTime = new Date();                                                           // RUN TIME TRACK START
    let response = await fetch(backendAddress+'/api/allentry/',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    let data = await response.json()
    if(response.status === 200){
      setEntries(data)
      console.log("Entries Fetched, time used: " + ((new Date() - startTime)/1000))         // RUN TIME TRACK END
    }else{
      alert("Something Wrong")
    }
  }
  let get_words = async() =>{
    let response = await fetch(backendAddress+'/api/words/',{
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
  let get_examples = async() =>{
    let response = await fetch(backendAddress+'/api/examples/',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
      },
      })

      if(response.status === 200){
        let e = await response.json()
        setExamples(e)
      }else{
        alert("Something wrong with examples")
      }
  }



  useEffect(()=>{
    getEntries()
    get_words()
    get_examples()
  }, [])



  const getEntriesFormattedForTable = (entries) =>{
      var result = entries.map(function (e) {
        return {
            ID: e.id,
            word: getWordByID(e.word),
            meaning: e.meaning,
            attribute: e.attribute,
            example: e.example
        };
      });
      return result 
  }

//   const getExamplesFormattedForTable = (entries, examples) =>{
//     var result = entries.map(function (e) {
//       return {
//           ID: e.id,
//           word: getWordByID(e.word),
//           meaning: e.meaning,
//           attribute: e.attribute,
//           example: e.example
//       };
//     });
//     return result 
// }

        
 
  const getWordByID = (id) => {
    return words.find(w => w.id === id).word
  }

  const getExampleByID = (id) =>{
    return examples.find(e => e.id === id).example
  }

  const getExampleListByEntry = (entry) =>{
    var l = []
    for(const example_id of entry.example){
      l.push(getExampleByID(example_id))
    }
    return l
  }

  
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