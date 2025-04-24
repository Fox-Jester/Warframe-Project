import { useState } from "react";
import btnPress from "./assets/audio/btn-press.mp3"

interface StockpileFilterProps{
    retrieveFilter: Function;
}

function StockpileFilter({retrieveFilter}: StockpileFilterProps){


    

    

    function handleClick(e: React.MouseEvent, id: string){

        const currentActive = document.querySelector(".filter-slide.active");
        const target = document.querySelector(`#${id}`);

        if(!(currentActive === target)){

            const type = id.slice(7);
    
            currentActive?.classList.remove("active");
            target?.classList.add("active");
    
            const audio = document.querySelector("#audio-btn");
            const mute = audio?.classList.contains("mute");
            
            
    
            if(!mute){
                const sound = new Audio(btnPress);
                sound.play()
            }
            console.log(type)
            retrieveFilter(type);
        }


    }

    return(
        <div  id="type-filter">
        <div id="filter-all" onClick={(e) => handleClick(e, "filter-all")} className="filter-slide active"><p>All</p></div>
        <div id="filter-prime" onClick={(e) => handleClick(e, "filter-prime")} className="filter-slide"><p>Primes</p></div>
        <div id="filter-mod" onClick={(e) => handleClick(e, "filter-mod")} className="filter-slide"><p>Mods</p></div>
        <div id="filter-arcane" onClick={(e) => handleClick(e, "filter-arcane")} className="filter-slide"><p>Arcanes</p></div>
        <div id="filter-riven" onClick={(e) => handleClick(e, "filter-riven")} className="filter-slide"><p>Rivens</p></div>
       
           
        

    </div>
    )

}

export default StockpileFilter