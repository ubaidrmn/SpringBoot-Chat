import { setChats } from "./InboxSlice"

export function getChats(email) {
    return (dispatch, getState) => {
      fetch(process.env.REACT_APP_API_URL + "chat/get?email="+email, {
          method: "GET",
      })
      .then(res=>res.json())
      .then(data=>{
          dispatch(setChats({chats:data}));
      })
    }
  }
