import { useState, useRef } from "react";
import SearchBar from "./SearchBar.tsx";

import btnPress from "./assets/audio/btn-press.mp3"
import createCardSound from "./assets/audio/create-card.mp3"

import StockCard from "./StockCard.tsx";


function CreateContent(){

    


    const [category, setCategory] = useState("prime");
    const [nameValue, setNameValue] = useState("");
    const numberValuesRef = useRef([0, 0])

    const notifCounterRef = useRef(0);
    

    const nameArrayRef = useRef<string []>([]);
    

    if(localStorage.getItem("stockArrayData")){

        interface stock{
            name: string;
        }

        const stockArray = JSON.parse(localStorage.getItem("stockArrayData")!);
        nameArrayRef.current = stockArray.map((stock:stock) => stock.name.toLowerCase())
        console.log(nameArrayRef.current);
        
    }

   
    

    function handleSelector(id: string){
        const currentActive = document.querySelector(".selector.active");
        const selected = document.querySelector(`#${id}`);

        if(!(currentActive === selected)){
            currentActive?.classList.remove("active");
    
            selected?.classList.add("active");
    
            setCategory(id.replace("-selector", ""));
            setNameValue("");
    
            const audio = document.querySelector("#audio-btn");
            const mute = audio?.classList.contains("mute");
    
            if(!mute){
                const sound = new Audio(btnPress);
                sound.play()
            }

        }

    }

   

    function handleCreate(){
        console.log(nameArrayRef.current)
        if(nameValue.trim() === ""){
            alert("please enter a name!");
        }
        else if(nameArrayRef.current.includes(nameValue.toLowerCase())){
            alert(`${nameValue} already exists`);
           
        }
        else{
            createCard()
        }
       
    }


    function createCard(){

        let stockArray = []
        let idCounter = 0
    
        if(localStorage.getItem("idCounterData")){
            idCounter = parseInt(localStorage.getItem("idCounterData")!)
        }
    
        if(localStorage.getItem("stockArrayData")){
            stockArray = JSON.parse(localStorage.getItem("stockArrayData")!)
        }
    
        const stockTemplate = {
            name: "",
            type: "",
            plat: 0,
            quantity: 0,

            id:0

        }

        const newStock = stockTemplate;

        newStock.name = nameValue;
        newStock.type = category;
        newStock.plat = numberValuesRef.current[0];
        newStock.quantity = numberValuesRef.current[1];

        newStock.id = idCounter;

        stockArray.push(newStock);

        localStorage.setItem("stockArrayData", JSON.stringify(stockArray))

        localStorage.setItem("idCounterData", (idCounter + 1).toString())

        const deleteBtn = document.querySelector(".delete-btn") as HTMLDivElement;
        deleteBtn?.click();

        setNameValue("");
        notify();


        const audio = document.querySelector("#audio-btn");
        const mute = audio?.classList.contains("mute");

        if(!mute){
            const sound = new Audio(createCardSound);
            sound.play()
        }
        
    }
    
    function notify(){
        const notif = document.querySelector(".notif-bubble");
        notifCounterRef.current++;
        
        if(notif?.classList.contains("reveal")){
            setTimeout(() => {
                notif.classList.add("reveal");
                setTimeout(() => {
                    notif?.classList.remove("reveal");
                    notifCounterRef.current--
                }, ( 3000));
            }, (notifCounterRef.current * 3100));
        }
        else{
            notif?.classList.add("reveal");
            setTimeout(() => {
                notif?.classList.remove("reveal");
                notifCounterRef.current--
            }, ( 3000));

        }

    }
    

    const notif = <div className="notif-bubble">
                    <p>Stock Added</p>
    </div>
    

    return(
        <>
        <div  className="selector-container">
            <div id="prime-selector"  onClick={() => handleSelector("prime-selector")} className="selector active"><p>Primes</p></div>
            <div id="mod-selector" onClick={() => handleSelector("mod-selector")} className="selector"><p>Mods</p></div>
            <div id="arcane-selector" onClick={() => handleSelector("arcane-selector")} className="selector"><p>Arcanes</p></div>
            <div id="riven-selector" onClick={() => handleSelector("riven-selector")} className="selector"><p>Rivens</p></div>
        </div>

        <SearchBar func={(value: string) => setNameValue(value)} type="create" category={category} btnName="ADD" />

        <StockCard type={category} name={nameValue} editable={true} retrieveValues={(platValue: number, setsValue:number) => numberValuesRef.current = [platValue, setsValue]}/>


        <button onClick={handleCreate} className="create-btn">Save</button>
       
        {notif}
        
        </>
    )
}

export default CreateContent;