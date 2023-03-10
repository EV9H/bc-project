import React, {useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'
// ANT DESIGN 
import { Card, Space, Layout, Button, Form, Radio, Alert} from 'antd'
import { InfoOutlined,InfoCircleOutlined } from '@ant-design/icons';

import Highlighter from "react-highlight-words";

// CSS
import '../css/styles.css'
import DataContext from '../context/DataContext';

const { Header, Content, Sider } = Layout;

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

const FunctionPage = () => {
  let [wordList, setWordList] = useState([])

  let {entries, words, examples, answers,
      getEntries, get_words, get_examples, 
      getWordByID,getExampleByID,getExampleListByEntry, getEntryByID,
      getUserAnswers, addAnswer,
    } = useContext(DataContext)
  
  useEffect( () => {
    generateRandomList(entries,10)
    getUserAnswers()

    
  }
    
  , [])

  const onChange = ({ target: { value } }) => {
    console.log('radio checked', value);
    // setValue3(value);
  };
  

  const generateRandomList = (data, n) =>{

    let temp = []
    let cnt =0 
    
    while(temp.length < n){
      
      let idx = Math.floor(Math.random()*data.length)
      if (temp.indexOf(idx) === -1){temp.push(idx)}
      cnt+= 1;
      if(cnt > 1000){console.log("FAILED");break;} // TO PREVENT INFINITE LOOP
    }
    let wl = []
    for(let i = 0; i < n; i++){
      wl.push(data[temp[i]])
    }
    setWordList(wl)

  }
  const getRandomExample = (entry) =>{
    let word = getWordByID(entry.word)
    let example = getExampleListByEntry(entry).sample()

    return <Highlighter className= "question-text" searchWords = {[word]} textToHighlight = {example} highlightStyle = {{backgroundColor: 'transparent', color:"red",textDecorationLine: 'underline', textUnderlineOffset: '6px',}}></Highlighter>
  }

  return (
    <Layout>
      <Space wrap style = {{display: 'flex', flexDirection:'column'}}>
        <h3>FUNCTION PAGE</h3>
        <Button onClick={() => {generateRandomList(entries,10)}}>Generate</Button>
        <Space wrap style = {{display: 'flex', flexDirection:"column"}}>
          <h3>????????? CARD GRID</h3>
          <Card title = "?????????" style = {{width: "80vw"}}>

            {wordList.map(e => (
              <Card.Grid style = {{width: '100%',textAlign: 'center',}} key = {e.id}>
                
                {getRandomExample(e)}
                <Button type = "text" shape = "circle" icon = {<InfoCircleOutlined style = {{fontSize: "28px"}} />} onClick= {()=>{alert(getWordByID(e.word) + ": (" + e.attribute + ") "+ e.meaning)}} style = {{float: "right"}}></Button>
              </Card.Grid>   
                ))}
          </Card>
          <h3>????????? FORM</h3>
          
          <Form title = "?????????" style = {{width: "1000px"}}>
{/*             
            <p style = {{textAlign:"right", marginRight:"25px"}}> ?????? | ?????? | ?????? | ?????? | ??????</p> */}
         
            
            {wordList.map(e => (
              <Form.Item key={e.id}>
                <div style = {{display:'flex', flexDirection: "row", justifyContent: 'space-between'}}>
                  <div >
                    {getRandomExample(e)}
                  </div>
                  
                  <div style ={{display:"flex" , flexDirection: 'row', alignItems:"center"}}>
                    <Radio.Group name= {"radio-button" + e.id}
                      label="Choices"
                      rules={[{
                                required: true,
                                message: 'Please pick an item!',
                              },]}
                      style = {{}} 
                      optionType="button"
                      buttonStyle='solid'
                    >             
                      <Radio value="0">??????</Radio>
                      <Radio value="1">??????</Radio>
                      <Radio value="2">??????</Radio>
                      <Radio value="3">??????</Radio>
                      <Radio value="4">??????</Radio>
                    </Radio.Group>
                  </div>
                </div>
                
              </Form.Item>
                
                
            ))}

            <Form.Item
              
              >
              <div>
                <Button type="primary" htmlType="submit" style = {{float:'right'}} >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form> 



        </Space>
      </Space>
      <Space>
        <h3>YOUR ANSWERS</h3>
        <ul>
          {answers.map( ans => (
            <li key = {ans.id}> {getWordByID(getEntryByID(ans.entry).word)}: {getEntryByID(ans.entry).meaning} - ??????????????? {ans.progressIncrement}</li>
          ))}
        </ul>
      </Space>

      <Button onClick ={() => {addAnswer(200, 1)}}>???????????????</Button>
    </Layout>
  )
}

export default FunctionPage