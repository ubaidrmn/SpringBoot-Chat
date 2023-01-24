import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import {useSelector} from "react-redux";
import { redirect, useNavigate } from "react-router-dom";


export default function ReverseAuthenticationWrapper(props) {
    
    const auth = useSelector(state=>state.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if (auth.loggedIn) {
            navigate("/inbox")
        }
    }, [auth])

    return (!auth.loggedIn ? props.children : null)    
}
