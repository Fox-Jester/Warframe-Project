
import {  useEffect, useState, useContext } from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons"



import decrement from "./assets/audio/decrement.mp3"
import increment from "./assets/audio/increment.mp3"


interface StockCardProps{
    type: string;
    name: string;
    editable?: boolean;
    plat?: number;
    sets?: number,
    retrieveValues?: Function;
    id?: number;
    searchAble?: boolean;
    
    

}





function StockCard({type, name, editable = false, plat = 0, sets = 0, retrieveValues, id, searchAble = false}: StockCardProps){

    
   
    const [platValue, setPlatValue] = useState(plat > 0 ? plat : "");

    const [numberOfSets, setNumberOfSets] = useState(sets > 0 ? sets : "");

    useEffect(() => {
        if(name === ""){
            setNumberOfSets("");
            setPlatValue("");
        }
    },[name])

    const stockArray = localStorage.getItem("stockArrayData") 
        ? JSON.parse(localStorage.getItem("stockArrayData")!) : false;

        
        if(stockArray){
            stockArray.forEach((stock: any) => {
                if(stock.id === id){
                    stock.plat = platValue;
                    stock.quantity = numberOfSets;
                    
                    

                    localStorage.setItem("stockArrayData", JSON.stringify(stockArray));
                    
                }
            })
        }
        
  
    

   
    if (retrieveValues) {
        retrieveValues(platValue ? platValue : 0, numberOfSets ? numberOfSets : 0);
        
    }
     
    function handleChange(e: React.ChangeEvent, type: string){
        const targetValue = (e.target as HTMLInputElement).value;
        if(Number(targetValue) || targetValue === "" || targetValue === "0"){
            if(type === "plat"){
                setPlatValue(targetValue);
            }
            else{
                setNumberOfSets(targetValue);
            }
            
        }
        
        
        
    }

   

   
    function handleSetBtn(type: string){
        const value = typeof numberOfSets === "string" ? numberOfSets.trim() : numberOfSets.toString().trim();
        const audio = document.querySelector("#audio-btn");
        const mute = audio?.classList.contains("mute");

        let newValue = 0
        if(type === "increase"){
            newValue = Number(value) + 1;
            if(!mute){
                const sound = new Audio(increment);
                sound.play()
            }
            
            
        }
        else {
            if(Number(value) > 0){
                newValue = Number(value) - 1;
                if(!mute){
                    const sound = new Audio(decrement);
                    sound.play()
                }
            }
        }

        setNumberOfSets(newValue.toString());
        
        
    }

    
    const editableSetInput = (<input type="text" className="set-input" maxLength={2} onChange={(e) => handleChange(e, "sets")} value={numberOfSets}  placeholder="0"/>)
    const setInput = (<input type="text" className="set-input" maxLength={2} value={numberOfSets} readOnly placeholder="0"/>)

    const content =(
        <>
        <div className="card-header">
            <div className="card-name-container">
                <p>{name}</p>
            </div>
            

            </div>
            <div className="plat-container">
                <input type="text" className="plat-input" onChange={(e) => handleChange(e, "plat")} value={platValue}  placeholder="0000" maxLength={4}/>
                <p>P</p>
               
            </div>
            <div className="sets-container">
                <div className="reduce-btn round-btn" onClick={() => handleSetBtn("reduce")}><FontAwesomeIcon className="minus" icon={faMinus}/></div>
                {editable ? editableSetInput: setInput}
                <div className="increase-btn round-btn" onClick={() => handleSetBtn("increase")}><FontAwesomeIcon className="plus" icon={faPlus}/></div>
               
            </div>
    
        </>
        )

    

    return(
        id ?  <div id={"stock-card" + id} className={"stock-card" + " " + type}>{content}</div> : <div className={"stock-card" + " " + type}>{content}</div>
    )
}

export default StockCard;