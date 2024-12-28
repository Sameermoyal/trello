import React,{ createContext ,useState} from 'react'


const EmailContext = createContext(null);

function UserEmailProvider({children}) {
    const [userEmail, setUserEmail] = useState('');
    const[userName,setUserName]=useState("")

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail,userName,setUserName }}>
        {children}
    </EmailContext.Provider>
  )
}

export default UserEmailProvider

export {EmailContext}