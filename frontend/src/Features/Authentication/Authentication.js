import {Divider, Typography} from "antd"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "./AuthenticationThunks";
import Logo from "../../Common/Logo";
import { useEffect } from "react";
import { Content } from "antd/es/layout/layout";

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
