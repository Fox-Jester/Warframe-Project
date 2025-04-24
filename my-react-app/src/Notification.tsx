import { useEffect, useState } from "react";

interface NotificationProps{
    message: string;
}

function Notification({message}: NotificationProps){

    const [timeIsUp, setTimeIsUp] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTimeIsUp(true)
        }, 3000);
    },[]);

    if(timeIsUp){
        return(null)
    }
    else{
        return(
            <div className="notif-bubble hidden">
                <p>{message}</p>
            </div>
        )
    }

}

export default Notification