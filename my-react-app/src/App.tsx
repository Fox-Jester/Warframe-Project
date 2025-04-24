import NavBar from "./NavBar.tsx"
import SearchContent from "./SearchContent.tsx"
import CreateContent from "./CreateContent.tsx";
import { useState } from "react"




function App() {


  const [content, setContent] = useState("search");
 
  
  
     
      


  function toggleContent(){
    if(content === "search"){
      setContent("create");
    }
    else{
      setContent("search");
    }
  }

 

  
 

  return (
    
      <>
      <NavBar linkName={content === "search" ? "Add to Stash" : "Search Stash"} swap={toggleContent}/>

      <div className="page-content">
        {content === "search" ? <SearchContent/> : <CreateContent/>} 
      </div>

      
      
      
      </>
  )
}

export default App
