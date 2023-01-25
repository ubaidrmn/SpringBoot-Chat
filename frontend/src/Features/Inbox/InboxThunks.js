import { setLoading } from "../../App/AppSlice";
import { setChats } from "./InboxSlice"

export function getChats(email) {
    return (dispatch, getState) => {
      dispatch(setLoading({loading:true}))
      fetch(process.env.REACT_APP_API_URL + "chat/get?email="+email, {
          method: "GET",
      })
      .then(res=>res.json())
      .then(data=>{
        dispatch(setChats({chats:data}));
        dispatch(setLoading({loading:false}))
      })
    }
}

export function createChat(token, email, emails) {
  return (dispatch, getState) => {
    console.log("HAHAHAHHAHE")
    dispatch(setLoading({loading:true}))
    fetch(process.env.REACT_APP_API_URL + "chat/create?token="+token, {
      method: "POST",
      body: JSON.stringify({emails:emails}),
      headers: {
        'Content-Type': 'application/json'
      },  
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch(getChats(email));
      dispatch(setLoading({loading:false}))
    })
  }
}