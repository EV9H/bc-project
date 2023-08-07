import React, {useContext,useState,useEffect} from 'react'
import DataContext from '../context/DataContext';
import AuthContext from '../context/AuthContext'


// ANT DESIGN 
import { Card, Button, Form, Divider, Space,Breadcrumb, Layout, Menu, theme} from 'antd'
import { PlusOutlined,InfoCircleOutlined } from '@ant-design/icons';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// CSS
import '../css/styles.css'
import CreateClassForm from '../components/CreateClassForm'
import JoinClassForm from '../components/JoinClassForm';
import MyClassInfo from '../components/MyClassInfo';

const { Header, Content, Sider } = Layout;




const ManagePage = () => {
  
  let {getClassDetail, classDetail} = useContext(DataContext)
  
  let {getClassList,classList, getClassByAdmin, classListByAdmin} = useContext(DataContext)

  const [createClassVisible, setCreateClassVisible] = useState(false)
  const [joinClassVisible, setJoinClassVisible] = useState(true)
  const [joinPromptVisible, setJoinPromptVisible] = useState(false)
  const [myClassVisible, setMyClassVisible] = useState(false)

  const [selectedMyClass, setSelectedMyClass] = useState(-1)
  const [classes, setClasses] = useState("")
  const [classData, setClassData] = useState()
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  useEffect(  ()=> {
    getClassList()
    .then(setClasses(classList))    
    .then(getClassByAdmin())
    .then(setLoading(false))
    // .then(console.log(classListByAdmin))
  },[]) 

  useEffect(  ()=> {
    setClassData(classDetail)
  },[classDetail]) 

  function handleClick(e){
    setJoinPromptVisible(true)
    localStorage.setItem('selectedClass',e.name)
    // console.log(e)
  }
  // const fetchClassDetail = async (k) => {
  //     await getClassDetail(k)
  //     .then(classDetail)
  // }
  function handleMenuClick(key){
    if(key === 'join'){
      getClassList()
      .then(setClasses(classList))  
      setJoinClassVisible(true)

      setCreateClassVisible(false)
      setMyClassVisible(false)
    }else if(key === 'create'){
      setCreateClassVisible(true)

      setJoinClassVisible(false)
      setMyClassVisible(false)
    }else if(key.startsWith('myClass')){
      // MY CLASS FUNC 
      let classKey = key.slice(7)
      
      getClassDetail(classKey)
      setSelectedMyClass(classKey)
      
      setMyClassVisible(true)
      setJoinClassVisible(false)
      setCreateClassVisible(false)

    }
  }

  function generateManagedClassList(){
    
    if(classListByAdmin === []){
      return {}
    }

    let tempClasses = []

    for(let i = 0; i < classListByAdmin.length ; i ++){

      let item = {key: "myClass"+classListByAdmin[i].id, label: classListByAdmin[i].name }

      tempClasses.push(item)
    }
    return tempClasses
    // {key: 'myClassList',label: `班级1`}
  }

  const sideItems2 = 
  [
    {
      key: '1',
      icon: React.createElement(UserOutlined),
      label:'加入班级',
      children: [{key: 'join',label: `加入`}],
    },
    {
      key: '2',
      icon: React.createElement(UserOutlined),
      label:'创建班级',
      children: [{key: 'create',label: `创建`}],
      
    },
    {
      key: '3',
      icon: React.createElement(UserOutlined),
      label:'我的班级',
      children: generateManagedClassList(),
    }
  ]

  return (
    
        <Layout style={{minHeight: '100vh',}}>
            
            <Sider 
              collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
              width={200}
              style={{
              background: colorBgContainer,
              }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  // defaultOpenKeys={['sub1']}
                  style={{
                    height: '100%',
                    borderRight: 0,
                  }} 
                  items = {sideItems2}
                  onClick= {({key})=> {
                    handleMenuClick(key)
                  }}
                >
                  <Menu.Item key = "">

                  </Menu.Item>
                </Menu>

            </Sider>
            <Layout style = {{minHeight: '100vh',}}>
              {/* JOIN CLASS */}
              {joinClassVisible && 
                <Space direction="vertical" size="middle" style={{ display: 'flex', background:colorBgContainer, minHeight: '95vh' , padding:'5%'}}>
                
                    <Card title = "班级列表 Class List" style = {{ width: '50%', textAlign:'center', margin:'auto'}}>

                    {classList.map(e => (
                      <Card.Grid style = {{width: '100%',textAlign: 'left',}} key = {e.id}>
                        
                        {e.name} | 简介： <span style = {{color: "gray",}}>{e.description}</span>
                        <Button type = "text" shape = "circle" icon = {<PlusOutlined  style = {{fontSize: "28px"}} />}  style = {{float: "right"}}
                          onClick={() => {handleClick(e) }}
                        ></Button>
                      </Card.Grid>   
                        ))}  
                  </Card>
                
                {joinPromptVisible && 
                  <div style = {{width:'50%', margin:'auto',textAlign:'center',}}><JoinClassForm /> 
                  <Button type = "text" style = {{margin:'auto', color:"black",  fontSize:'28px'}} 
                    onClick = {()=>{setJoinPromptVisible(false)}}>^</Button>
                  </div>
                }

                </Space>
              }
              
                
                
              {/* CREATE CLASS */}
                {createClassVisible && 
                  <Space direction = 'vertical' size="middle" style = {{display: 'flex', background:colorBgContainer,minHeight:'95vh'}} > 
                    <Space direction="vertical" size="middle" style={{ display: 'flex', width:'50%', margin:'auto' }}>
                      <CreateClassForm/>
                    </Space>
                  </Space>
                }
              
              {/* MY CLASS */}
              {myClassVisible && 
                  <Space direction = 'vertical' size="middle" style = {{display: 'flex', background:colorBgContainer,minHeight:'95vh'}} > 
                    <Space direction="vertical" size="middle" style={{ display: 'flex', width:'50%', margin:'auto' }}>
                     {classData && <MyClassInfo selectedClass = {selectedMyClass} data = {classData}/>}
                    </Space>
                  </Space>
                }
            </Layout>
                
        </Layout>
       
    
  )
}

export default ManagePage