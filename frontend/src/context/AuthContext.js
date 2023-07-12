import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import {useNavigate} from 'react-router-dom'
import Header__ from '../components/Header'


const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const backendAddress = "http://127.0.0.1:8000/"
    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch(backendAddress+ '/api/token/', {
            method: 'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username' : e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        // console.log('data fetched: ', data)
        // console.log("response", response)

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
            Header__.setCurrent('')
        }else{
            alert("Some error occured.")
        }
    }

    let loginUserAnt = async (values) => {
        let response = await fetch(backendAddress+ '/api/token/', {
            method: 'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username' : values.username, 'password': values.password})
        })
        let data = await response.json()
        // console.log('data fetched: ', data)
        // console.log("response", response)
        
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/account')
        }else{
            alert("Some error occured.")
        }
    }

    let signupUser = async (values) => {
        let response = await fetch(backendAddress+ '/api/register/', {
            method: 'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username' : values.username, 'password': values.password})
        })
        let data = await response.json()
        // console.log('REG | data fetched: ', data)
        // console.log("REG | response", response)
        if(response.status === 201){
            alert("注册成功！")
            navigate('/login')
        }else{
            alert("Some error occured.")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        // navigate('/login')
    }

    let updateToken = async () => {
        if (authTokens === null){
            setLoading(false)
        }else{
            let response = await fetch(backendAddress+ '/api/token/refresh/', {
                method: 'POST', 
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({'refresh' : authTokens?.refresh})
            })
            let data = await response.json()
    
           
            if(response.status === 200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            }else{
                logoutUser()
            }
            
            if(loading){
                setLoading(false)
            }

        }
            
    }
    let contextData = {
        user:user,
        authTokens: authTokens,
        logoutUser: logoutUser,
        loginUserAnt: loginUserAnt,
        signupUser: signupUser,
        backendAddress:backendAddress,
    }

    useEffect(()=>{

        if(loading){
            updateToken()
        }
        let fourMinutes =  1000 * 60 * 4 
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value = {contextData}>
            {loading? null : children}
        </AuthContext.Provider>
    )
}

