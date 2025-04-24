
import Logo from "./Logo.tsx";
import AudioBtn from "./AudioBtn.tsx"
import DeleteToggle from "./DeleteToggle.tsx";
import { useState } from "react";

import pageSwitch1 from "./assets/audio/page-switch-1.mp3"
import pageSwitch2 from "./assets/audio/page-switch-2.mp3"

interface NavBarProps {
    linkName: string;
    swap: () => void;
    
   
   
  }

function NavBar({ linkName, swap}: NavBarProps) {


    const [sticky, setSticky] = useState(false);

    function stickyCheck(){
        if(window.scrollY >= 380){
            setSticky(true);
        }
        else{
            setSticky(false);
        }
    }

    window.addEventListener("scroll", stickyCheck)


    function handleLink(){

        const audio = document.querySelector("#audio-btn");
        const mute = audio?.classList.contains("mute");

        if(linkName === "Add to Stash"){
            if(!mute){
                const sound = new Audio(pageSwitch2);
                sound.play()
            }
        }
        else{
            if(!mute){
                const sound = new Audio(pageSwitch1);
                sound.play()
            }
        }


        swap()
    }

    return(
    
        <div className={sticky ? "nav-bar sticky" : "nav-bar"}>
            <Logo/>

            <div className="nav-group">
            {linkName === "Add to Stash" ? <DeleteToggle/> : null}
            <AudioBtn/>
            <h2 id="page-link" onClick={handleLink} className="link" >{linkName}</h2>
            </div>


        </div>
    )
} 

export default NavBar;