import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getFriendList } from "../Friends/FriendsThunks";
import { getChats } from "../Inbox/InboxThunks";
import { setJwt } from "./AuthenticationSlice";
import { verifyUser } from "./AuthenticationThunks";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { setLoadingEndMessage } from "../../App/AppSlice";

export default function AuthenticationWrapper(props) {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
    const socket = new SockJS("http://127.0.0.1:8080/ws/notifications")
    const stompClient = new Stomp.over(socket);
    
    useEffect(()=>{
        console.log(cookies['auth-token'])
        if (cookies['auth-token'] !== undefined && cookies['auth-token'] !== null) {
            dispatch(verifyUser(cookies['auth-token']));
            dispatch(setJwt({jwt:cookies['auth-token']}));
        }

    }, [])

    const auth = useSelector(state=>state.auth);

    useEffect(()=>{

        if (auth.loggedIn) {
            dispatch(getChats(auth.userData.email));
            dispatch(getFriendList(auth.jwt));

            stompClient.connect({}, frame => {
                stompClient.subscribe("/chatnotify"+auth.userData.email, message => {
                    console.log(message)
                    const data = JSON.parse(message.body);
                    dispatch(setLoadingEndMessage({loadingEndMessage: data.text}))
                    if (data.text.search("You have a new friend request") !== -1 || data.text.search("accepted your friend request")) {
                        dispatch(getFriendList(auth.jwt))
                        dispatch(getChats(auth.userData.email));
                    }
                })
            })

        }
    },[auth])

    return (auth.loggedIn ? props.children : 
    <Content style={{padding: '0px 50px', textAlign: "center"}}>
        <br/><br/><br/><br/>
        <h1>Oops! Something went wrong</h1>
        <p>You need to <Link to="/auth" style={{textDecoration: "underline"}}>login</Link> in order to view this page</p>
    </Content>)    
}
