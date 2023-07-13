import React, {useState, useEffect, useContext} from 'react'

// ANT DESIGN 
import {Card, Row, Carousel, Space, Layout, theme} from 'antd'
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
    // console.log(currentSlide);
    
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
          <Card title = "本土化 Localized" style = {{width: 300, margin:16,background: colorBgContainer,}} cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/300/300"
                  />
                } >
            <ul style = {{listStyle: 'none', padding: 0}}>
              <li >主要由教师管理的学习系统，帮助国内初、高中学生无法使用电子设备时的高效学习。</li>
              <li style = {{marginTop:"10px"}}>A learning system taylored for instructors to administrater. In aid of learning by students who lack constant access to electronic devices in school</li>
            </ul>
            
          </Card>
          <Card title  = "效率 Efficiency"  style = {{width: 300,margin:16,}} cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/350/350"
                  />
                }>  
            <ul style = {{listStyle: 'none', padding: 0}}>
              <li>支持一键批量打印、扫描，与一目了然的学生学习进度</li>
              <li style = {{marginTop:"10px"}}>Support bulk printing and scanning. Overview student statistics in one click.</li>

            </ul>
          </Card>
          <Card title  = "个性化 Individualized"  style = {{width: 300,margin:16,}} cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/400/400"
                  />
                }>  
            <ul style = {{listStyle: 'none', padding: 0}}>
              <li>针对学生学习情况，使用机器学习，为每个产出最优化、个性化的学习任务</li>
              <li style = {{marginTop:"10px"}}>Using machine learning, produce individualized learning tasks in regard of student's own learning profile</li>
            </ul>
          </Card>

          

        </Row>
      </Layout>
      
    </Layout>
  

   
  )
}

export default HomePage