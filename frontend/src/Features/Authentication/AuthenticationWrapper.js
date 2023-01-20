import { Content } from "antd/es/layout/layout";
import {useSelector} from "react-redux";

export default function AuthenticationWrapper(props) {
    
    const auth = useSelector(state=>state.auth);

    console.log(auth);

    return (auth.loggedIn ? props.children : <Content style={{padding: '0px 50px', textAlign: "center"}}><br/><br/><h1>You must login in order to view this page</h1></Content>)    
}
