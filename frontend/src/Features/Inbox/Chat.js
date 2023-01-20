import { useEffect } from "react"
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import AuthenticationWrapper from "../Authentication/AuthenticationWrapper";

export default function Chat(props) {
    
    const socket = new SockJS("http://127.0.0.1:8080/ws/connect")
    const stompClient = new Stomp.over(socket);

    useEffect(()=>{
        
        stompClient.connect({}, frame => {
            console.log("CONNECTED")
            stompClient.subscribe("/chat", message => {
                console.log(message);
            })
        })

    }, [])
    

    return (
        <>
        <AuthenticationWrapper>
            <div className="all-content">
                <br/><br/>
                <h1>Chat</h1>
                <input placeholder="Type something..."></input>
                <button onClick={()=> {
                    stompClient.send("/app/send", {}, JSON.stringify({name:"ubaid"}))
                }}>send</button>
            </div>
        </AuthenticationWrapper>
        </>
    )
}