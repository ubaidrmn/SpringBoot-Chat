import { setLoggedIn, setUserData } from "./AuthenticationSlice";

export function verifyUser(jwt) {
    return (dispatch, getState) => {
      fetch(process.env.REACT_APP_API_URL + "users/login?token="+jwt, {
          method: "GET",
      })
      .then(res=>res.json())
      .then(data=>{
          dispatch(setLoggedIn())
          dispatch(setUserData({name: data.name, email: data.email, picture: data.picture}))
      })
    }
  }
