import {Divider, Typography} from "antd"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "./AuthenticationThunks";
import Logo from "../../Common/Logo";
import { useEffect } from "react";

const {Title} = Typography;

const Authentication = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);
    
    const responseGoogle = (response) => {
        dispatch(verifyUser(response.credential));
    }

    useEffect(()=>{
        console.log(auth);
    },[auth])

    return (
        <>
            <Title style={{margin:"0px", marginRight:"20px", marginTop:"5px"}} level={2}>Chat App</Title>
            <Logo />
            <Divider />
                <GoogleOAuthProvider 
                    clientId="192136603544-5f21lpassjk3e09ci5o0if0d5csmnsvj.apps.googleusercontent.com" >
                    <GoogleLogin
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </GoogleOAuthProvider>
            <h1>
            {auth.userdata.name}
            </h1>
            <h1>
            {auth.userdata.email}
            </h1>
            <img src={auth.userdata.picture}></img>
        </>
    )   
}

export default Authentication;
