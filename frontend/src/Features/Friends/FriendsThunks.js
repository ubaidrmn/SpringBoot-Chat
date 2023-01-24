import { setLoading, setLoadingEndMessage } from "../../App/AppSlice"
import { getChats } from "../Inbox/InboxThunks";
import { setFriends } from "./FriendsSlice"

export function getFriendList(jwt) {
    return (dispatch, getState) => {
        dispatch(setLoading({loading: true}));
        fetch(process.env.REACT_APP_API_URL + "users/get-friends?token="+jwt, {
            method: "GET",
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch(setFriends({friends: data}))
            dispatch(setLoading({loading: false}));
        })
    }
  }

  
export function sendFriendRequest(jwt, email) {
    return (dispatch, getState) => {
        dispatch(setLoading({loading: true}));
        fetch(process.env.REACT_APP_API_URL + "users/add-friend?token="+jwt+"&email="+email, {
            method: "GET",
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch(setLoading({loading: false}));
            dispatch(setLoadingEndMessage({loadingEndMessage: 'Friend request sent to ' + email}))
        })
    }
  }

    
export function acceptFriendRequest(jwt, email) {
    return (dispatch, getState) => {
        dispatch(setLoading({loading: true}));
        fetch(process.env.REACT_APP_API_URL + "users/accept-request?token="+jwt+"&email="+email, {
            method: "GET",
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch(setLoading({loading: false}));
            dispatch(setLoadingEndMessage({loadingEndMessage: 'Friend request accepted'}))
            dispatch(getFriendList(jwt));
            dispatch(getChats(getState().auth.userData.email));
        })
    }
  }