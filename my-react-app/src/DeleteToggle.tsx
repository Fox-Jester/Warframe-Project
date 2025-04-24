
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"


import btnPress from "./assets/audio/btn-press.mp3"





function DeleteToggle(){






function handleToggle(){
    const deleteToggle = document.querySelector(".delete-toggle") as HTMLDivElement;
    deleteToggle.classList.toggle("delete-mode");

    const audio = document.querySelector("#audio-btn");
        const mute = audio?.classList.contains("mute");

    if(!mute){
        const sound = new Audio(btnPress);
        sound.play()
    }


 
}


    return(
       
        
        <div onClick={handleToggle} className="nav-btn delete-toggle">
            <FontAwesomeIcon icon={faTrashCan}/>
        </div>
      
        
    )
}


export default DeleteToggle