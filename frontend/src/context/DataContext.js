import React, { createContext, useState, useEffect, useContext} from "react";
import AuthContext from "./AuthContext";
import {backendAddress} from "./AuthContext";


const DataContext = createContext()
export default DataContext

export const DataProvider = ({children}) =>{
    let [entries, setEntries] = useState([])
    let [words, setWords] = useState([])
    let [examples, setExamples] = useState([])
    let [progress, setProgress] = useState([])
    let [loading, setLoading] = useState(true)
    let [profile, setProfile] = useState([])
    let [classList, setClassList] = useState([])
    let [classListByAdmin, setClassListByAdmin] = useState([])
    let [classDetail, setClassDetail] = useState()
    let {backendAddress, authTokens,user} = useContext(AuthContext)
    
    const getAll = async () => {
        if(entries.length === 0){
            console.log("GETTING ALL DATA")
            await getEntries()
            await get_words()
            await get_examples()
        }
        // if(words === []){
            // await get_words()
        // }
        // if(examples === []){
            // await get_examples()
        // }
        
            
        
        
        
        setLoading(false)
    }
    useEffect(()=>{

        (async () => {
            await getAll()
         })()
         .then(()=> {console.log("ALL GOT"); })
         .catch(console.error)
        
    }, [loading])


    let getEntries = async() => {
        console.log("Start fetching entries") 
        if(localStorage.hasOwnProperty('entries')){
            console.log("--- entries already exist")
            setEntries(JSON.parse(localStorage.getItem('entries')))
        }
        else{
            console.log('--- entries does not exist')
            let response = await fetch(backendAddress+'/api/allentry/',{
                method: 'GET',
                headers:{
                'Content-Type': 'application/json'
                }
            })
            if(response.status === 200){
                let data = await response.json()
                setEntries(data)
                console.log("FETCH SUCCESSFUL")
                localStorage.setItem('entries', JSON.stringify(data))
            }else{
                alert("Something Wrong")
            }
        }
        
    }
    let get_words = async() =>{
        if(localStorage.hasOwnProperty('words')){
            setWords(JSON.parse(localStorage.getItem('words')))
        }
        else{
            
            let response = await fetch(backendAddress+'/api/words/',{
                method: 'GET',
                headers:{
                'Content-Type': 'application/json',
                },
            })
            
            let w = await response.json()
            if(response.status === 200){
                // return w
                setWords(w)
                localStorage.setItem('words', JSON.stringify(w))
            }else{
                alert("Something wrong with words")
            }
        }
        
    }
    let get_examples = async() =>{
        if(localStorage.hasOwnProperty('examples')){
            setExamples(JSON.parse(localStorage.getItem('examples')))
        }else{
            let response = await fetch(backendAddress+'/api/examples/',{
                method: 'GET',
                headers:{
                'Content-Type': 'application/json',
                },
                })
    
            if(response.status === 200){
                let e = await response.json()
                setExamples(e)
                localStorage.getItem('examples', JSON.stringify(e))
            }else{
                alert("Something wrong with examples")
            }
        }
        
        // return null

    }


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
    const getEntryByID = (id) =>{
        return entries.find(e => e.id === id)
    }
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

    // USER FUNCTIONS 
    const getUserProgress = async () => {
        let response = await fetch(backendAddress+'/api/getProgress/',{
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })

        if(response.status === 200){
            let progress = await response.json()
            setProgress(progress)
        }else{
            alert("Something wrong with fetching users progress")
        }
    }
    const addUserProgress = async (entry, progress) => {
        fetch(backendAddress+'/api/addProgress/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                entry,
                progress,
            })
        })
    }

    // 
    const getProfile = async () => {
        let response = await fetch(backendAddress+'/api/profile/',{
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })

        if(response.status === 200){
            let profile = await response.json()
            setProfile(profile)
        }else{
            alert("Something wrong with fetching users profile")
        }
    }
    const editProfile = async (user,name, bio) => {
        fetch(backendAddress+'/api/profile/',{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                user: user['user_id'],
                name,
                bio
            })
        })
    }

    const createClass = async (name, description, password) => {
        // console.log(name, description, password)
        let response = fetch(backendAddress+'/api/createClass/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                admin: user['user_id'],
                name,
                description,
                password,
            })
        })

        let data = await response.json()
        if(response.status == 200){
            alert("创建成功")
        }else{
            alert("Some error occured.")
        }
    }


    const joinClass = async (values) => {
        let response = await fetch(backendAddress+'/api/joinClass/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                'name': values.name,
                'password': values.password,
            })
        })

        let data = await response.json()
        if(response.status == 200){
            return true
        }else{
            return false
        }
    }

    let getClassList = async () => {
        let response = await fetch(backendAddress+'/api/allclass/',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        
        if(response.status === 200){
            let e = await response.json()
            setClassList(e)
        }else{
            console.log("ERROR:", response)
            alert("Something wrong with class list")
        }
    }

    // const editClass = asyn(user, class) => {
    //     fetch(backendAddress+'/api/class/',{
    //         method: 'PUT',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + String(authTokens.access)
    //         },
    //         body: JSON.stringify({
    //             user: user['user_id'],
    //             class
    //         })
    //     })
    // }

    let getClassByAdmin = async () => {
        let response = await fetch(backendAddress+'/api/getClassByAdmin/',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        
        if(response.status === 200){
            let e = await response.json()
            setClassListByAdmin(e)

        }else{
            console.log("ERROR:", response)
            alert("Something wrong with getting class list by admin")
        }
    }

    let getClassDetail = async (id) => {

        let response = await fetch(backendAddress+'/api/classGroupDetail/'+id,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })

        
        if(response.status === 200){
            let e = await response.json()
            setClassDetail(e)

        }else{
            console.log("ERROR:", response)
            alert("Something wrong with getting class detail")
            return false
        }
    }

    // EXPORT CONTEXT
    let contextData = {
        entries:entries,
        words:words,
        examples:examples,
        progress: progress, 
        profile: profile, 
        classList: classList,
        classListByAdmin: classListByAdmin,
        classDetail: classDetail,

        getEntries: getEntries,
        get_words:get_words,
        get_examples:get_examples,
        getEntriesFormattedForTable:getEntriesFormattedForTable,

        getWordByID:getWordByID,
        getExampleByID:getExampleByID,
        getExampleListByEntry:getExampleListByEntry,
        getEntryByID:getEntryByID,

        getUserProgress: getUserProgress,
        addUserProgress: addUserProgress,
        
        getProfile: getProfile,
        editProfile: editProfile,
        
        createClass:createClass,
        joinClass:joinClass,
        getClassList:getClassList,
        getClassByAdmin: getClassByAdmin,
        getClassDetail:getClassDetail,
    }

    return(
        <DataContext.Provider value = {contextData}>
            { loading ? null : children}
        </DataContext.Provider>
    )
}