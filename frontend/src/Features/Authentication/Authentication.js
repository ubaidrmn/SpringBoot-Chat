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
import { useGoogleLogin } from '@react-oauth/google';


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
        console.log(cookies['auth-token'])
        if (cookies['auth-token'] !== undefined && cookies['auth-token'] !== null) {
            dispatch(verifyUser(cookies['auth-token']));
            dispatch(setJwt({jwt:cookies['auth-token']}));
        }

    }, [])

    return (
        <>
            <Content style={{
                position: "fixed",
                top: "0px",
                zIndex: "999",
                maxWidth: "100%",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <div style={{
                    maxWidth: "300px",
                    width: "100%",
                    margin: "0 auto"
                }}>
                    <center>
                    <img src="logo.png" style={{
                        width: "100px",
                        height: "auto"
                    }}></img>
                    <br/><br/>
                    <h1 style={{margin: "0px"}}>Get Started With ChatHub.</h1>
                    <br/>
                    <div style={{}} id="login-btn-google"><GoogleLogin onSuccess={responseGoogle}></GoogleLogin></div>
                    <div style={{
                            maxWidth: "100%",
                            width: "100%",
                            border: "1px solid lightgrey",
                            outline: "none",
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            cursor: "pointer",
                            backgroundColor: "white",
                            fontSize: "15px",
                            display: "flex",
                            justifyContent: "center",
                            display: "none"
                        }} onClick={()=>{
                        }}><span><img src="/google.png" style={{marginRight: "10px",height: "20px", width: "auto"}}></img></span><span style={{marginTop: "3px"}}>Sign in with Google</span></div>
                    <br/>
                    <p style={{
                        margin: "0px",
                        fontSize: "12px",   
                        color: "grey"
                    }}>Logging in with your google account means you agree to our Privacy Policy and Terms of Service.</p>
                    </center>
                </div>
            </Content>
        </>
    )   
}

export default Authentication;
