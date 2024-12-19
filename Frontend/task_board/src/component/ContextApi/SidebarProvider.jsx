import React, { createContext ,useState} from 'react'

 const SidebarContext = createContext(); 

function SidebarProvider({children}) {
 const[expand,setExpand]= useState(false)

 const toggelSidebar = ()=>{
    setExpand((prevExpand)=>!prevExpand)
 }

  return (
   <SidebarContext.Provider  value={{expand,toggelSidebar}}>
    {children}
   </SidebarContext.Provider>
  )
}

export default SidebarProvider
export {SidebarContext}
