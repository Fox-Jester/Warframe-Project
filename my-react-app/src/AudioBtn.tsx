
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faVolumeHigh} from "@fortawesome/free-solid-svg-icons"
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import btnPress from "./assets/audio/btn-press.mp3"

import { useEffect, useState } from "react";

function AudioBtn(){

    const [audio, setAudio] = useState(true);

    useEffect(() => {
        if(localStorage.getItem("audioData")){
            setAudio(false);
        }
    },[])

    useEffect(() => {
        const audioToggle = document.querySelector("#audio-btn") as HTMLDivElement;
        
        if(audio){
            audioToggle.classList.remove("mute");
        }
        else{
            audioToggle.classList.add("mute");
        }

    },[audio])
    
    function handleClick(){

        if(audio === true){
            setAudio(false);
            localStorage.setItem("audioData", "mute");
        }
        else{
            setAudio(true);
            localStorage.setItem("audioData", "");
            const sound = new Audio(btnPress);
            sound.play()
        }

    }


    return(
        <div className="nav-btn" id="audio-btn" onClick={handleClick}>
            {audio ? <FontAwesomeIcon icon={faVolumeHigh}/> : <FontAwesomeIcon icon={faVolumeMute}/>}
        </div>
    )
}

export default AudioBtn;