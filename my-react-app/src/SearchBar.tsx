import PSReferenceList from "./PSReferenceList.tsx";
import AReferenceList from "./AcraneReferenceList.tsx";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faX} from "@fortawesome/free-solid-svg-icons"

import search from "./assets/audio/search.mp3"
import btnPress from "./assets/audio/btn-press.mp3"



import React, { useState, useRef, useEffect } from "react";


interface SearchBarProps {
   
    func: Function;
    type?: string;
    category?: string;
    btnName?: string;
  }

function SearchBar({ func, type = "search", category, btnName = "Search"}: SearchBarProps){



    

    const [inputValue, setInputValue] = useState("");
    const [deleteBtn, setDeleteBtn] = useState(false);
    

    useEffect(() => {
        

        window.addEventListener("click", (e) => {
            const target = e.target as HTMLElement
            if(document.querySelector(".search-list.active")){
                if(!(target.nodeName === "LI" || target.classList.contains("search-input"))) {
                    closeDropDown();
                    
                }
            }
            
        })
    },[])

    const rawListRef = useRef<(any)[]>([]);
    const searchListRef = useRef<(any)[]>([]);
    
    const searchValueRef = useRef<string>("");
    
    


        if(type === "create"){

            if(category === "prime"){
                rawListRef.current = PSReferenceList;
                if(localStorage.getItem("stockArrayData")){
                    stockArrayFilter()
                }
            }
            else if(category === "arcane"){
                rawListRef.current = AReferenceList;
                if(localStorage.getItem("stockArrayData")){
                    stockArrayFilter()
                }
                
            }
            else{
                rawListRef.current = [];
            };
    
    
            if(rawListRef.current){
                
                const searchArray = rawListRef.current.map((set) => {
                    if(set.toLowerCase().includes(inputValue.replace(/\s+/g,'').toLowerCase())){
                        return set
                    }
                    else return false
                })
    
                const filteredArray = searchArray.filter((set) => set !== false);
    
                const nameArray = filteredArray.map((set, index) => {
                    return <li onClick={handleListClick} key={"create" + set + index}>{set}</li>
                }) 
                
                searchValueRef.current = filteredArray.slice(0, 1).toString();
                searchListRef.current = nameArray.slice(0, 6);
            }
        }

        if(type === "search"){
            if(localStorage.getItem("stockArrayData")){
                rawListRef.current = JSON.parse(localStorage.getItem("stockArrayData")!);
            }
    
    
            if(rawListRef.current){
                const searchArray = rawListRef.current.map((set) => {
                    if(set.name.toLowerCase().includes(inputValue.replace(/\s+/g,'').toLowerCase())){
                        return set.name;
                    }
                    else return false
                })
    
                const filteredArray = searchArray.filter((name) => name !== false);
    
                const nameArray = filteredArray.map((name, index) => {
                    return <li onClick={handleListClick} key={"serach" + name + index}>{name}</li>
                }) 
                
                searchValueRef.current = filteredArray.slice(0, 1).toString();
                if(nameArray.length === 0){
                    searchListRef.current = [<li key={"noResult"} className="no-result">no results found</li>];
                }
                else{
                    searchListRef.current = nameArray.slice(0, 6);

                }
            }

        }

   
    function stockArrayFilter(){
        const stockArray = JSON.parse(localStorage.getItem("stockArrayData")!);
        const stockNameArray = [] as string[];

        interface stock{
            name: string;
        }

        stockArray.forEach((stock:stock) => {
            stockNameArray.push(stock.name.toLowerCase().replace(/\s+/g,'')) 
        })

      

        rawListRef.current = rawListRef.current.filter(name => !stockNameArray.includes(name.toLowerCase()))
       

        


    }
        

    function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){
            handleSearchBtn()  
            
        }
    }

    function handleListClick(e: React.MouseEvent){
        const value = (e.target as HTMLLIElement).innerHTML
        setInputValue(value);
        func(value);
        closeDropDown()
        setDeleteBtn(true);

        const audio = document.querySelector("#audio-btn");
        const mute = audio?.classList.contains("mute");

        if(!mute){
            const sound = new Audio(search);
                sound.play()
        }
    }

    function handleSearchBtn(){
        func(inputValue);
        const audio = document.querySelector("#audio-btn");
        const mute = audio?.classList.contains("mute");

        if(!mute){
            const sound = new Audio(search);
                sound.play()
        }
        
    }

    function handleInput(e: React.ChangeEvent){
        const value = (e.target as HTMLInputElement).value
        setInputValue(value);
        if(value.replace(/\s+/g,'')){
            setDeleteBtn(true);
        }
        else{
            setDeleteBtn(false)
        }
    }

    function openDropDown(){
        const list = document.querySelector(".search-list");
        list?.classList.add("active")
    }

    function closeDropDown(){
        const list = document.querySelector(".search-list");
        list?.classList.remove("active")
    }
    
    function clearInput(){
        setDeleteBtn(false);
        setInputValue("");
        
     
    }

   const placeHolder = btnName === "Search" ? "Search your Stockpile" : "Add a Name!"

   const xBtn = (<div className="delete-btn" onClick={clearInput}><FontAwesomeIcon icon={faX} /></div>)

    return(

        <div className="search-container">
        <div className="search-bar">
            
            <input onFocus={openDropDown} onKeyDown={handleEnterKey} onChange={handleInput} value={inputValue} placeholder={placeHolder} className="search-input" maxLength={34} type="text" />
            {deleteBtn ? xBtn : null}
            <button onClick={handleSearchBtn} className="search-btn">{btnName}</button>
        </div>
        <ul className="search-list">
            {searchListRef.current}
        </ul>

        </div>
    )
}

export default SearchBar