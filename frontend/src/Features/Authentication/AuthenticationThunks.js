import { setLoading, setLoadingEndMessage } from "../../App/AppSlice";
import { setJwt, setLoggedIn, setLoggedOut, setUserData } from "./AuthenticationSlice";

export function verifyUser(jwt) {
    return (dispatch, getState) => {
      dispatch(setLoading({loading: true}))
      fetch(process.env.REACT_APP_API_URL + "users/login?token="+jwt, {
          method: "GET",
      })
      .then(res=>res.json())
      .then(data=>{
        if (Object.keys(data).includes("status") && data['status'] != 200) {
          dispatch(setLoggedOut())
          dispatch(setLoadingEndMessage({loadingEndMessage: 'An error occurred when trying to login'}))
        } else {
          dispatch(setUserData({name: data.name, email: data.email, picture: data.picture}))
          dispatch(setLoggedIn())
          dispatch(setLoadingEndMessage({loadingEndMessage: 'Logged in successfully'}))
        }
        dispatch(setLoading({loading: false}));
      })
    }
  }
