import { Content } from "antd/es/layout/layout";
import AuthenticationWrapper from "../Authentication/AuthenticationWrapper";
import Chat from "./Chat";

export default function Inbox(props) {
    return (
        <>
        <AuthenticationWrapper>
          <br/><br/>
          <div className="all-content">
            <h1>Inbox</h1>
            
          </div>
        </AuthenticationWrapper>
        </>
    );
}
