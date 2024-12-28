import React,{createContext,useState} from 'react'

const templateContext=createContext()

function TemplateProvider({children}) {
   const[ templateUrl,setTemplateUrl]=useState(null);
   
   function toggleTemplate(url){
    setTemplateUrl(url)
  }
  
  console.log("templateUrl>>>>>>>>>",templateUrl)

  return (
   <templateContext.Provider value={{templateUrl,toggleTemplate}}>
    {children}
   </templateContext.Provider>
   
  )
}

export default TemplateProvider
export {templateContext}