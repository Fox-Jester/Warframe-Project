

function Logo(){


    function handleClick(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return(
        <div onClick={handleClick} className="logo">
            <h1>WARFRAME <br /><mark>S</mark>TOCK<mark>P</mark>ILE</h1>
        </div>
    )
}

export default Logo;