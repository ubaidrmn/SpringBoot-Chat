import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "../Common/AppHeader";
import Loader from "../Common/Loader";
import Authentication from "../Features/Authentication/Authentication";
import AuthenticationWrapper from "../Features/Authentication/AuthenticationWrapper";
import ReverseAuthenticationWrapper from "../Features/Authentication/ReverseAuthenticationWrapper";
import Friends from "../Features/Friends/Friends";
import Chat from "../Features/Inbox/Chat";
import Inbox from "../Features/Inbox/Inbox";
import Store from "./Store";

function App() {

  return (
    <> 
    <BrowserRouter>
      <Provider store={Store}>
        {/* {process.env.REACT_APP_API_URL} */}
        <AppHeader />
        <Loader />
        <Routes>
          <Route exact path="auth" element={<ReverseAuthenticationWrapper><Authentication /></ReverseAuthenticationWrapper>} />
          <Route exact path="inbox" element={<AuthenticationWrapper><Inbox /></AuthenticationWrapper>} />
          <Route exact path="friends" element={<AuthenticationWrapper><Friends /></AuthenticationWrapper>} />
          <Route path="chat/:id" element={<AuthenticationWrapper><Chat /></AuthenticationWrapper>} />
        </Routes>
      </Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
