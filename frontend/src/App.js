//import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

function App() {

  const responseGoogle = (response) => {
    console.log(response.credential);
  }

  return (
    <>
    <GoogleOAuthProvider 
      clientId="192136603544-5f21lpassjk3e09ci5o0if0d5csmnsvj.apps.googleusercontent.com" >
      <GoogleLogin
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </GoogleOAuthProvider>;
    </>
  );
}

export default App;
