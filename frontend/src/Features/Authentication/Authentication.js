import {Divider, Typography} from "antd"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "./AuthenticationThunks";
import Logo from "../../Common/Logo";
import { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import { setJwt } from "./AuthenticationSlice";
import {useCookies} from "react-cookie";

const {Title} = Typography;

const Authentication = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);

    const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
    
    const responseGoogle = (response) => {
        dispatch(verifyUser(response.credential));
        dispatch(setJwt({jwt:response.credential}));
        setCookie("auth-token", response.credential, {
            path: "/"
        });
    }

    useEffect(()=>{
        console.log(auth);
    },[auth])

    return (
        <>
            <Content style={{
                padding: '0 50px',
            }}>
                <center>
                <br/><br/>
                <Title style={{margin:"0px", marginRight:"20px", marginTop:"5px"}} level={1}>Sign in with your google account</Title>
                <Divider />
                <GoogleOAuthProvider 
                        clientId="192136603544-5f21lpassjk3e09ci5o0if0d5csmnsvj.apps.googleusercontent.com" >
                        <GoogleLogin
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                </GoogleOAuthProvider>
                </center>
            </Content>
        </>
    )   
}

export default Authentication;
