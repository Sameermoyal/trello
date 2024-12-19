import React,{ createContext ,useState} from 'react'


const EmailContext = createContext(null);

function UserEmailProvider({children}) {
    const [userEmail, setUserEmail] = useState('');

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
        {children}
    </EmailContext.Provider>
  )
}

export default UserEmailProvider

export {EmailContext}