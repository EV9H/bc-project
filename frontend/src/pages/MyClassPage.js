import React, {useContext,useState,useEffect} from 'react'
import DataContext from '../context/DataContext';
import AuthContext from '../context/AuthContext'


// ANT DESIGN 
import { Card,Button, Form, Divider, Space,Breadcrumb, Layout, Menu, theme, Row, Col, Typography, Image, Avatar} from 'antd'
import { PlusOutlined,InfoCircleOutlined } from '@ant-design/icons';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// CSS
import '../css/styles.css'
import CreateClassForm from '../components/CreateClassForm'
import JoinClassForm from '../components/JoinClassForm';
import MyClassInfo from '../components/MyClassInfo';

const { Header, Content, Sider } = Layout;

const {Title, Text, Link}  = Typography 

const style = {
    background: '#0092ff',
    padding: '8px 0',
};
const buttonStyle = {
    width:'100px',
    borderRadius:'50px',
    height:'2rem',


}
const MyClassPage = () => {
  

  
    return (
        <Layout style = {{padding:'3% 10% 1% 10%'}}>    
            
            <Row style = {{width:'100%', paddingLeft: '2%', paddingBottom:'1%', flex:'1', justifyContent:'start', alignItems:'center'}}>
                <div>
                    <Space>
                        <Button style = {buttonStyle} >1</Button>
                        <Button style = {buttonStyle}>2</Button>
                        <Button style = {buttonStyle}>3</Button>
                        <Button style = {buttonStyle}>4</Button>
                    </Space>
                    
                </div>
                
            </Row>

            <Row style = {{width:'100%', paddingLeft: '2%', paddingBottom:'1%', flex:'1', justifyContent:'start', alignItems:'center'}}>
                <Card style = {{background:'#fff', width:'100%' }}>
                    <Row gutter = {16}>
                        
                        <Col span = {8}>
                            <Space>
                                <Card style = {{ textAlign:'center',color:'white', flex:'1', justifyContent:'center',background:'linear-gradient(0deg, rgb(75,169,229),rgb(162,207,53))'}}>
                                    <Title level = {4} style = {{ color:'white', padding:'0px'}}>熟知程度对应人数总览</Title>
                                    <Image
                                        style = {{padding:'10px'}}
                                        src="https://picsum.photos/200/300"
                                    />
                                    <div>0%~10%</div>
                                    <div>10%~30%</div>
                                    <div> 80%</div>
                                </Card>
                            </Space>
                        </Col>
                        <Col span = {16}>
                            <Row gutter={[12,12]}>

                            
                             <Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                             <Text>...班级</Text>


                                         </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical'>
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
    
                                    
                                    
                                </Card>
                            </Col>

                            <Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col>

                            <Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col>

                            <Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col>

                            <Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col><Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col><Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col><Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col><Col span = {12}>
                                <Card>
                                    <Row gutter={6}>
                                        <Col span = {12}>
                                            <div style = {{display:'flex', flex:'1', flexDirection:'row' }}>
                                                
                                                <Avatar size={50}></Avatar>
                                                <div style = {{ paddingLeft:'10px', textAlign:'left', display:'flex', flex:'1', flexDirection:'column'}}>
                                                    <Text>王小明</Text>
                                                    <Text>2023005</Text>
                                                </div>
                                            </div>  

                                        </Col >
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Text>...班级</Text>


                                        </Col>
                                    </Row>
                                    <Row gutter={6}>
                                        <Col span = {12}style = {{}}></Col>
                                        <Col span = {12} style = {{textAlign:'right'}}>
                                            <Space direction='vertical' >
                                                <Text>综合记忆比例:__%</Text>
                                                <Text>熟知词汇比例:__%</Text>
                                            </Space>

                                        </Col>
                                    </Row>
                                </Card>
                                
                            </Col>

                            </Row>
                        </Col>
                        <Col span = {8}>
                                
                        </Col>

                    </Row>

                </Card>
            </Row>
            
        
        </Layout>
        


    )
       
    
  
}

export default MyClassPage