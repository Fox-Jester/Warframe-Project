import { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar.tsx";
import StockCard from "./StockCard.tsx";
import Stockpile from "./Stockpile.tsx";
import StockpileFilter from "./StockpileFilter.tsx";
import { JSX } from "react";
import cardDeleteSound from "./assets/audio/card-delete.mp3"


function SearchContent(){

    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("all");
    const [deleteMode, setDeleteMode] = useState(false);
    const [cardDelete, setCardDelete] = useState(0)

    

    const counterRef = useRef(0);
    const notifCounterRef = useRef(0);

    useEffect(() => {
        const deleteToggle = document.querySelector(".delete-toggle");
        deleteToggle?.addEventListener("click", handleDeleteToggle);

        return() => {
            deleteToggle?.removeEventListener("click", handleDeleteToggle);
        }
    },)

    
    useEffect(() => {
        const stockCards = document.querySelectorAll(".stock-card");
        
        
        
        if (deleteMode) {
            stockCards.forEach((card) => {
                card.classList.add("deletable");
                card.addEventListener("click", handleCardClick);
            });
        } 
        else {
            
            stockCards.forEach((card) => {
                card.classList.remove("deletable");
                card.removeEventListener("click", handleCardClick); // Clean up event listeners
            });
        }
        
        return () => {
            stockCards.forEach((card) => {
                card.removeEventListener("click", handleCardClick);
            });
        };
        
        
    },);
    
    useEffect(() => {
        const targetNotif = document.querySelector(`#notif-${counterRef.current}`);
        setTimeout(() => {
            targetNotif?.remove()
        }, 3000);
    },[counterRef.current])
    
    interface stock{
        name: string,
        type: string,
        plat: number,
        quantity: number,
        id: number;
    }
    const stockCardRef = useRef<null | JSX.Element>(null);
    
    
    
    const stockArray = localStorage.getItem("stockArrayData") 
    ? JSON.parse(localStorage.getItem("stockArrayData")!) : false;
    
    if(stockArray){
        let matches = 0
        
        stockArray.forEach((stock: stock, index:number) => {
            if(stock.name.toLowerCase() === searchValue.toLowerCase()){
                stockCardRef.current = <StockCard key={stock.name + "-" + index} name={stock.name} type={stock.type} 
                plat={stock.plat} sets={stock.quantity} id={stock.id} searchAble={true}/>
                matches++
            }
        });
        
        if(matches === 0){
            stockCardRef.current = null
            
            
        }
        
        
    }
    function handleCardClick(event: Event){
        const card = event.currentTarget as HTMLElement;
        if (confirm("Are you sure you want to delete?") === true) {
            const idNumber = card.id.slice(10);
            
            const stockArray = JSON.parse(localStorage.getItem("stockArrayData")!);
            const newStockArray = stockArray.filter((stock: any) => stock.id != idNumber);
            
            localStorage.setItem("stockArrayData", JSON.stringify(newStockArray));
            
            notify();
            setCardDelete(prev => prev + 1);

            const audio = document.querySelector("#audio-btn");
            const mute = audio?.classList.contains("mute");
            
            if (!mute) {
                const sound = new Audio(cardDeleteSound);
                sound.play();
            }
        }
    };
    
    function handleDeleteToggle(){
        if(deleteMode === false){
            setDeleteMode(true);
        }
        else{
            setDeleteMode(false);
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
                    <p>Stock Deleted</p>
    </div>



    return(
        <>
            <SearchBar func={(value: string) => setSearchValue(value)} />
            {searchValue ? stockCardRef.current : null}
            <StockpileFilter retrieveFilter={(value: string) => setFilterValue(value)}/>
            <Stockpile filter={filterValue} searched={searchValue}/>
            {notif}
            
        </>
            

        
    )
}

export default SearchContent;