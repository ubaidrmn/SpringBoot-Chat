import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AuthenticationWrapper, { stompClient } from "../Authentication/AuthenticationWrapper";
import { addMessage } from "./InboxSlice";
import { getChats } from "./InboxThunks";

export default function Chat(props) {
    const params = useParams();
    
    const auth = useSelector(state=>state.auth)
    const inbox = useSelector(state=>state.inbox);
    const dispatch = useDispatch();

    const sendMessage = ()=> {
        stompClient.send("/app/send", {}, JSON.stringify({jwt: auth.jwt,content:document.getElementById("message").value, chatId: params.id, senderEmail: auth.userData.email}))
        document.getElementById("message").value = ""
    }

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
                                console.log(message)
                                return <div style={{
                                    backgroundColor: message.senderEmail == auth.userData.email ? "#140F26" : "#F2F5F9",
                                    color: message.senderEmail == auth.userData.email ? "white" : "#140F26",
                                }} className="chat-message" key={i}>
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
                    <input onKeyDown={e=>{
                        console.log(e.key)
                        if (e.key == "Enter") {
                            sendMessage();
                        }
                    }} id="message" placeholder="Type something..."></input>
                    <button onClick={sendMessage}>send</button>
                </div>
            </div>
        </>
    )
}
