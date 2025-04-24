
import { useRef, useEffect  } from "react";

import StockCard from "./StockCard.tsx";

interface StockpileProps{
   
    filter?: string
    searched?: string
}

function Stockpile({filter = "all", searched}: StockpileProps){

    const filteredType = filter === "all" ? "" : filter




    const stockListRef = useRef<(any)[]>([]);

    useEffect(() => {
        const link = document.querySelector("#page-link");

        if(stockListRef.current.length === 0){
            link?.classList.add("blinking");
            
        }

        return() => {
            link?.classList.remove("blinking");
        }
    },)

    interface stock{
        name: string,
        type: string,
        plat: number,
        quantity: number,
        id: number;
    }

    if(localStorage.getItem("stockArrayData")){
        const stockArray = JSON.parse(localStorage.getItem("stockArrayData")!);
        const mixedArray = stockArray.map((stock: stock, index: number) => {
            if(stock.type.includes(filteredType) && (searched ? !(stock.name.toLowerCase() === searched.toLowerCase()) : true)){
                return <StockCard key={stock.id + "-" + index} name={stock.name} type={stock.type} plat={stock.plat} sets={stock.quantity} id={stock.id}/>
            }
            else{
                return false
            }
            
        });

        stockListRef.current = mixedArray.filter((stock: any) => stock !== false);

    }


    

    const emptyList = (<p>Stockpile Empty...</p>)



    return(
        <div className="stockpile">
           
                {stockListRef.current.length > 0 ? stockListRef.current : emptyList}
        </div>
    )
}

export default Stockpile;