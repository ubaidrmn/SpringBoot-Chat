import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AppHeader from "../Common/AppHeader";
import Loader from "../Common/Loader";
import Authentication from "../Features/Authentication/Authentication";
import AuthenticationWrapper from "../Features/Authentication/AuthenticationWrapper";
import ReverseAuthenticationWrapper from "../Features/Authentication/ReverseAuthenticationWrapper";
import Friends from "../Features/Friends/Friends";
import Chat from "../Features/Inbox/Chat";
import Inbox from "../Features/Inbox/Inbox";
import MainWrapper from "./MainWrapper";
import Store from "./Store";

function App() {

  const HomePage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      navigate("/auth");
    }, [])
    return <></>
  }

  return (
    <> 
    <GoogleOAuthProvider clientId="192136603544-5f21lpassjk3e09ci5o0if0d5csmnsvj.apps.googleusercontent.com" >
    <BrowserRouter>
      <Provider store={Store}>
        {/* {process.env.REACT_APP_API_URL} */}
        <Loader />
        <Routes>
          <Route exact path="" element={<HomePage></HomePage>} />
          <Route exact path="auth" element={<ReverseAuthenticationWrapper><Authentication /></ReverseAuthenticationWrapper>} />
          <Route exact path="inbox" element={
            <MainWrapper>
              <AuthenticationWrapper><Inbox /></AuthenticationWrapper>
            </MainWrapper>
          } />
          <Route exact path="friends" element={
            <MainWrapper>
              <AuthenticationWrapper><Friends /></AuthenticationWrapper>
            </MainWrapper>
          } />
          <Route path="chat/:id" element={
            <MainWrapper>
              <AuthenticationWrapper><Chat /></AuthenticationWrapper>
            </MainWrapper>
          } />
        </Routes>
      </Provider>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;
