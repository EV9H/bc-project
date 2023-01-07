import React, {useState, useEffect, useContext} from 'react'

// ANT DESIGN 
import {Button, Card, ConfigProvider, Row, Carousel, Space, Layout, theme} from 'antd'
// CSS
import '../css/styles.css'

const contentStyle = {
  margin: 0,
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#203175',
  
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HomePage = () => {
  
  const onChange = (currentSlide) => {
    console.log(currentSlide);
    
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style = {{}}>
        
      <Carousel afterChange={onChange}>
        <div>
          <h3 style = {contentStyle}> 文言文实词狂 </h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    
      <Layout id = "home-page" style ={{marginBottom: "24px", marginTop: "24px",}}>
        <Row gutter= {16}>
          <Card title = "已完成功能" style = {{width: 300, margin:16,background: colorBgContainer,}} cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/300/300"
                  />
                } >
            <ul>
              <li>登陆</li>
              <li>注册</li>
            </ul>
            
          </Card>
          <Card title  = "In Progress 功能"  style = {{width: 300,margin:16,}} cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/350/350"
                  />
                }>  
            <ul>
              <li>词汇库 by Louis Wu</li>
              <li>Function Page Setup - sample 背词软件页 </li>
              
            </ul>
          </Card>
          <Card title  = "To-do 功能"  style = {{width: 300,margin:16,}} cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/400/400"
                  />
                }>  
            <ul>
              <li>账户-specific 词语完成量</li>
            </ul>
          </Card>

        </Row>
      </Layout>
      
    </Layout>
  

   
  )
}

export default HomePage