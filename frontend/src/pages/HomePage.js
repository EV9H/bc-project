import React, {useState, useEffect, useContext} from 'react'

// ANT DESIGN 
import {Card, Row, Carousel, Space, Layout, theme, Typography, Col, Calendar, Divider, Image} from 'antd'
// CSS
import '../css/styles.css'
const { Title,Text, Link} = Typography;
const calenderHeaderRender = () => null;
const contentStyle = {
  color: '#000',
  lineHeight: '160px',
  textAlign: 'left',
  background: '#white',
  
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
    <Layout style = {{background:'#EEEEEE', paddingLeft:'10vw', paddingRight:'10vw'}}>
      <Space style = {{margin:'30px'}}>
        <Title>文言文实词狂</Title>
      </Space>
      <Row gutter={[8,8]}>
          <Col span = {16} style = {{}} >
          
            <Row gutter = {[8,8]}>
              <Col span = {24}>
                <Carousel afterChange={onChange} style = {contentStyle}>
                <Card style = {{contentStyle, margin:'10px'}}>
                    <Row >
                      <Col span = {12}>
                        <Title style = {{color: '#000',  lineHeight: '40px'}} level = {2}>从教师到学生，无缝连接</Title>
                          <Divider></Divider>
                          <Text>主要由教师管理的学习系统，帮助国内初、高中学生无法使用电子设备时的高效学习。
                            A learning system taylored for instructors to administrater. 
                            In aid of learning by students who lack constant access to electronic devices in school`</Text>
                      </Col>
                      <Col span = {12}>
                        <Image
                          style = {{padding:'20px', borderRadius:'30px'}}
                          src="https://picsum.photos/400/200"
                        />
                      </Col>
                      
                    </Row>
                    
                </Card>
                <Card style = {contentStyle}>
                    <Title style = {{color: '#000',  lineHeight: '40px'}}>支持一键批量打印、扫描，与一目了然的学生学习进度</Title>
                    <Text>针对学生学习情况，使用机器学习，为每个产出最优化、个性化的学习任务 Using machine learning, produce inCardidualized learning tasks in regard of student's own learning profile</Text>
                </Card>
                  
                </Carousel>

              </Col>
              <Col span = {12}>
                <Card 
                  title = { <Title level = {3}>我的班级</Title>}
                  extra={<a href="#"><Link level = {3} style = {{}}>更多</Link></a>}
                  style = {{textAlign:'left', padding: '10px', color:''}}>
                      {/* <Title level = {2} style = {{color: '#000', height: '20px', marginBottom:'50px'}}>我的班级</Title> */}
                      <Row gutter={[10,10]}>
                        <Col span = {12}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center',fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)"}}>八年3班</Card></Col>
                        <Col span = {12}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center',fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)"}}>八年1班</Card></Col>
                        <Col span = {12}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center',fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)"}}>八年4班</Card></Col>
                        <Col span = {12}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center',fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)"}}>八年2班</Card></Col>
                      </Row>
                      
                      
                </Card>
              </Col>

              <Col span = {12} >
                <Card 
                  title = { <Title level = {3}>近期词书</Title>}
                  extra={<a href="#"><Link level = {3} style = {{}}>更多</Link></a>}
                  style = {{textAlign:'left', padding: '10px', height:'100%', width: '100%'}}>
                    {/* <Title level = {2} style = {{color: '#000', height: '20px', marginBottom:'50px'}}>
                      近期词书</Title> */}
                    <Row gutter={[10,10]} style = {{height:'100%'}}>
                      <Col span = {12} style = {{height:'100%', alignItems:'center'}}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center', fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)"}}>人教版</Card></Col>
                      <Col span = {12} style = {{height:'100%'}}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center',fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)" }}>沪教版</Card></Col>
                      <Col span = {12} style = {{height:'100%'}}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center',fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)"}}>XX版</Card></Col>
                      <Col span = {12} style = {{height:'100%'}}><Card style = {{background:'#03e4a1',color:'white',textAlign:'center',fontSize:'1rem', boxShadow: "5px 3px 10px 2px rgba(100, 255, 255, 0.3)"}}>我的词书</Card></Col>
                    </Row>
                </Card>
              </Col>
              
            </Row>
            
            <Row gutter={[8,8]}>
                
            </Row>
          
        </Col>
        <Col span = {8} >
            <div style ={{ margin: '5px', background:'#fff', padding:'10px' ,borderRadius:'10px', flexDirection:'column', flex:'1'}}>
              <div style = {{padding :'10px'}}>
                   <Row>
                    <Col span = {12}>
                      <Image
                      style = {{padding:'5px', borderRadius:'50px',maxHeight:'120px', maxWidth:'120px'}}
                      src="https://picsum.photos/100/100"
                    /></Col>
                    <Col span = {12}>
                      <Title level = {3}> 用户 AAA </Title>
                      <Link>我的班级</Link>    <Link>设置</Link></Col>
                   </Row>
                   
                    
                  
              </div>
              <Calendar fullscreen = {false} style = {{padding:'10px', paddingBottom:'0px'}} headerRender={calenderHeaderRender}></Calendar>
              <div style = {{padding :'10px', paddingTop:'0px', margin:'0px', flex:1}}>
                  <Title style = {{textAlign:'center'}} level = {5}>距离下次考试还有__天__时</Title>
                 
              </div>
            </div>
        </Col>
      </Row>
     
      
      
    </Layout>
  

   
  )
}

export default HomePage


