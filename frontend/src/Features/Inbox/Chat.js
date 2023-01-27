import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AuthenticationWrapper, { stompClient } from "../Authentication/AuthenticationWrapper";
import { addMessage } from "./InboxSlice";
import { getChats } from "./InboxThunks";
import CryptoJS from "crypto-js";
// import {JSEncrypt} from "jsencrypt";

export default function Chat(props) {
    const params = useParams();
    
    const auth = useSelector(state=>state.auth)
    const inbox = useSelector(state=>state.inbox);
    const dispatch = useDispatch();
    
    const sendMessage = ()=> {
        const message = {jwt: auth.jwt,content:document.getElementById("message").value, chatId: params.id, senderEmail: auth.userData.email}
        const salt = CryptoJS.lib.WordArray.random(128/8);
        const KEY = CryptoJS.PBKDF2("SECRET_KEY", salt, { keySize: 512/32, iterations: 1000 }).toString();
        // encrypt.setPublicKey(inbox.publicKey);
        var encrypted_key = window.encryptMessage(message, KEY);
        console.log(encrypted_key)
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(message), KEY).toString();
        // var bytes  = CryptoJS.AES.decrypt(ciphertext, KEY).toString(CryptoJS.enc.Utf8);

        stompClient.send("/app/send", {}, JSON.stringify({
            enc_message: ciphertext,
            // enc_aes_key: encrypted_key 
        }))
        document.getElementById("message").value = ""
    }

    return (
        <>
            <script type="module" src="bin/jsencrypt.min.js"></script>
            <script type="module" src="/jsencrypt.min.js"></script>
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
