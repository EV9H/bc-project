import React, { createContext, useState, useEffect, useContext} from "react";
import AuthContext from "./AuthContext";
import {backendAddress} from "./AuthContext";

const DataContext = createContext()
export default DataContext

export const DataProvider = ({children}) =>{
    let [entries, setEntries] = useState([])
    let [words, setWords] = useState([])
    let [examples, setExamples] = useState([])
    let [answers, setAnswers] = useState([])
    let [loading, setLoading] = useState(true)


    let {backendAddress, authTokens} = useContext(AuthContext)
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
    const getUserAnswers = async () => {
        let response = await fetch(backendAddress+'/api/answers/',{
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })

        if(response.status === 200){
            let answers = await response.json()
            setAnswers(answers)
        }else{
            alert("Something wrong with fetching users answers")
        }
    }
    const addAnswer = async (entry, progressIncrement) => {
        fetch(backendAddress+'/api/addanswer/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                entry,
                progressIncrement,
            })
        })
    }

    // EXPORT CONTEXT
    let contextData = {
        entries:entries,
        words:words,
        examples:examples,
        answers: answers, 
        
        getEntries: getEntries,
        get_words:get_words,
        get_examples:get_examples,
        getEntriesFormattedForTable:getEntriesFormattedForTable,

        getWordByID:getWordByID,
        getExampleByID:getExampleByID,
        getExampleListByEntry:getExampleListByEntry,
        getEntryByID:getEntryByID,

        getUserAnswers: getUserAnswers,
        addAnswer: addAnswer,
    }

    return(
        <DataContext.Provider value = {contextData}>
            { loading ? null : children}
        </DataContext.Provider>
    )
}