import Logo from "../components/common/Logo";
import {Divider, Typography} from "antd"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import HorizontalAlign from "../components/common/HorizontalAlign";
import VerticalAlign from "../components/common/VerticalAlign";
import Content from "../components/common/ContentWrapper";

const {Title} = Typography;

const LoginPage = props => {

    const responseGoogle = (response) => {
        console.log(response.credential);
    }

    return (
        <>
            <VerticalAlign>
            <Content width="500px">
                    <HorizontalAlign>
                        <Title style={{margin:"0px", marginRight:"20px", marginTop:"5px"}} level={2}>Chat App</Title>
                        <Logo />
                    </HorizontalAlign>
                    <Divider />
                    <HorizontalAlign>
                        <GoogleOAuthProvider 
                            clientId="192136603544-5f21lpassjk3e09ci5o0if0d5csmnsvj.apps.googleusercontent.com" >
                            <GoogleLogin
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />
                        </GoogleOAuthProvider>;
                    </HorizontalAlign>
            </Content>
            </VerticalAlign>
        </>
    )   
}

export default LoginPage;