import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "../Common/AppHeader";
import Loader from "../Common/Loader";
import Authentication from "../Features/Authentication/Authentication";
import Inbox from "../Features/Inbox/Inbox";
import Settings from "../Features/Settings/Settings";
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
          <Route exact path="auth" element={<Authentication />} />
          <Route exact path="settings" element={<Settings />} />
          <Route exact path="inbox" element={<Inbox />} />
        </Routes>
      </Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
