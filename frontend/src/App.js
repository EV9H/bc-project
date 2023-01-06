import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TutorialPage from './pages/TutorialPage';
import FunctionPage from './pages/FunctionPage';
import AccountPage from './pages/AccountPage';

import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Router>
          <AuthProvider>
            <Header/>
              <Routes>
                <Route exact path = "/"  element = {<PrivateRoute/>} >
                  <Route exact path = '/' element = {<HomePage/>}/>
                </Route>
                <Route exact path = "/"  element = {<PrivateRoute/>} >
                  <Route exact path = '/account' element = {<AccountPage/>}/>
                </Route>
                <Route path = "/tutorial" element= {<TutorialPage/>}/>
                <Route path = "/login" element = {<LoginPage/>}/>
                <Route path = "/start" element = {<FunctionPage/>}/>
              </Routes>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
