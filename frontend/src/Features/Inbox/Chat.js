import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import AuthenticationWrapper from "../Authentication/AuthenticationWrapper";
import { addMessage } from "./InboxSlice";
import { getChats } from "./InboxThunks";

export default function Chat(props) {

    const params = useParams();
    
    const socket = new SockJS("http://127.0.0.1:8080/ws/connect")
    const stompClient = new Stomp.over(socket);
    const auth = useSelector(state=>state.auth)
    const inbox = useSelector(state=>state.inbox);
    const dispatch = useDispatch();

    useEffect(()=>{
        
        stompClient.connect({}, frame => {
            stompClient.subscribe("/chat"+auth.userData.email, message => {
                const data = JSON.parse(message.body);
                dispatch(addMessage({id: params.id, message: {
                    content: data.content,
                    sender: data.sender,
                    senderEmail: data.senderEmail,
                    senderPicture: data.senderPicture
                }}))
                document.getElementById("chatbox").scrollTo(0, document.getElementById("chatbox").scrollHeight)
            })
        })

    },[])

    return (
        <>
            <div className="all-content">
                <br/>
                <h2>{inbox.chats.map(chat=>{
                    if (chat.id == params.id) {
                        return chat.title
                    }
                })}</h2>
                <div id="chatbox">

                    {inbox.chats.map(chat=>{
                        if (chat.id == params.id) {
                            let i = 0;
                            return chat.messages.map(message=> {
                                i+=1;
                                return <div className="chat-message" key={i}>
                                    <div className="chat-message-image">
                                        <img src={message.senderPicture}></img>
                                    </div>
                                    <div className="chat-message-content">
                                        <h5>{message.sender}</h5>
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            })
                        }
                    })}
                    
                </div>

                <div className="chat-box-input">
                    <input id="message" placeholder="Type something..."></input>
                    <button onClick={()=> {
                        stompClient.send("/app/send", {}, JSON.stringify({jwt: auth.jwt,content:document.getElementById("message").value, chatId: params.id, senderEmail: auth.userData.email}))
                    }}>send</button>
                </div>
            </div>
        </>
    )
}
