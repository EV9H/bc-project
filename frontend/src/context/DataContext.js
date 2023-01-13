import React, { createContext, useState, useEffect, useContext} from "react";
import AuthContext from "./AuthContext";
import {backendAddress} from "./AuthContext";

const DataContext = createContext()
export default DataContext

export const DataProvider = ({children}) =>{
    let [entries, setEntries] = useState([])
    let [words, setWords] = useState([])
    let [examples, setExamples] = useState([])
    let {backendAddress} = useContext(AuthContext)
    let [loading, setLoading] = useState(true)

    const getAll = async () => {
        if(entries.length === 0){
            console.log("GETTING ENTRIES")
            await getEntries()
            console.log("entries GOT")
        }
        // if(words === []){
            await get_words()
        // }
        // if(examples === []){
            await get_examples()
        // }
        setLoading(false)
        console.log("GETTING ALL!")
    }
    useEffect(()=>{
        (async () => {
            await getAll()
         })()
         .then(()=> {console.log("ALL GOT")})
         .catch(console.error)
        
    }, [loading])


    let getEntries = async() => {
        console.log("Start fetching entries") 
        const startTime = new Date();                                                           // RUN TIME TRACK START
        let response = await fetch(backendAddress+'/api/allentry/',{
            method: 'GET',
            headers:{
            'Content-Type': 'application/json'
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setEntries(data)
            console.log("Entries Fetched, time used: " + ((new Date() - startTime)/1000))         // RUN TIME TRACK END
        }else{
            alert("Something Wrong")
        }
    }
    let get_words = async() =>{
        let response = await fetch(backendAddress+'/api/words/',{
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            },
            })

        if(response.status === 200){
            let w = await response.json()
            setWords(w)
        }else{
            alert("Something wrong with words")
        }
    }
    let get_examples = async() =>{
        let response = await fetch(backendAddress+'/api/examples/',{
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            },
            })

        if(response.status === 200){
        let e = await response.json()
        setExamples(e)
        }else{
        alert("Something wrong with examples")
        }
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

    let contextData = {
        entries:entries,
        words:words,
        examples:examples,

        getEntries: getEntries,
        get_words:get_words,
        get_examples:get_examples,
        getEntriesFormattedForTable:getEntriesFormattedForTable,

        getWordByID:getWordByID,
        getExampleByID:getExampleByID,
        getExampleListByEntry:getExampleListByEntry,
    }

    return(
        <DataContext.Provider value = {contextData}>
            { loading ? null : children}
        </DataContext.Provider>
    )
}