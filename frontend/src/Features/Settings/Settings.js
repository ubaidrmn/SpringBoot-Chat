import { Content } from "antd/es/layout/layout";
import AuthenticationWrapper from "../Authentication/AuthenticationWrapper";

const Settings = (props) => {
    return <>
    
    <AuthenticationWrapper>
        <Content style={{
            padding: "0px 50px"
        }}>
            <br/><br/>
            <h1>Settings</h1>
            <input placeholder="" />
        </Content>
    </AuthenticationWrapper>
    
    </>
}

export default Settings;