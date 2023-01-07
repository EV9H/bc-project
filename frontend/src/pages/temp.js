// TEMPLATES FOR AUTHORIZATION AND GET 
import AuthContext from '../context/AuthContext'

const TutorialPage = () => {
    // let {authTokens, logoutUser} = useContext(AuthContext)
    // let [notes, setNotes] = useState([])
  
    // useEffect(()=>{
    //   getNotes()
    // }, [])
  
    // let getNotes = async() => {
    //   let response = await fetch('http://127.0.0.1:8000/api/notes/',{
    //     method: 'GET',
    //     headers:{
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + String(authTokens.access)
    //     }
    //   })
  
    //   let data = await response.json()
    //   if(response.status === 200){
    //     setNotes(data)
    //   }else if(response.statusText === 'Unauthorized'){
    //     logoutUser()
    //   }
    // }
  
  
  
    return (
      <div className = "bg3" id = "tutorial-page">
        <p className='white'>TutorialPage</p>
        <Space wrap className='card white'>
            
        {/* <ul>
            {notes.map(note => (
            <li key = {note.id}>{note.body}</li>
            ))}
        </ul> */}
        </Space>
      </div>
    )
  }
  
  export default TutorialPage