import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TutorialPage from './pages/TutorialPage';
import FunctionPage from './pages/FunctionPage';
import AccountPage from './pages/AccountPage';
import SignupPage from './pages/SignupPage';

import Header__ from './components/Header'
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
import AuthProviderRoute from './utils/AuthProviderRoute';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

import {Layout } from 'antd'

const { Footer } = Layout;

function App() {
  return (
    <div className="App">
        <Router>
            {/* <AuthProvider> */}

            <Header__/>
            
            <Routes>
              <Route exact path = '/' element = {<HomePage/>}/>
              <Route exact path = "/"  element = { <AuthProviderRoute/> } > 

                  <Route path = "/tutorial" element= {<TutorialPage/>}/>
                  <Route path = "/login" element = {<LoginPage/>}/>
                  <Route path = "/register" element = {<SignupPage/>}/>
                  <Route exact path = "/start" element = {<PrivateRoute><FunctionPage/></PrivateRoute>}/>
                  <Route path = '/account' element = {<PrivateRoute><AccountPage/></PrivateRoute>}/>

              </Route>


            </Routes>
              

            <Footer style={{ textAlign: 'center', color: 'white', marginTop: '48px', marginBottom: '48px' }}>
                          文言文实词狂 ©2023 Created by TeamXXX
                      </Footer>
            {/* </AuthProvider> */}
          
        </Router>
    </div>
  );
}

export default App;
