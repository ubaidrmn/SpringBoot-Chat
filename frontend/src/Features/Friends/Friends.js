import { Button, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { acceptFriendRequest, sendFriendRequest } from "./FriendsThunks";

export default function Friends(props) {
    const friends = useSelector(state=>state.friends);
    const auth= useSelector(state=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(friends)
    }, [friends])

    return (
        <div className="all-content">
            <br/><br/>
            <div style={{
                display: "flex",
                flexDirection: "row",
                maxWidth: "100%",
                width: "100%"
            }}>
                <input id="add-email" placeholder="Enter an email" style={{
                    maxWidth: "100%",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    border: "0px",
                    padding: "30px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    fontSize: "15px",
                    outline: "none"
                }}></input>
                <button onClick={()=>{
                    dispatch(sendFriendRequest(auth.jwt, document.getElementById("add-email").value))
                }} style={{
                    backgroundColor: "#140F26",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    padding: "30px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    fontSize: "15px",
                    color: "white",
                    border: "0px",
                    outline: "none",
                    borderRadius: "30px",
                    marginLeft: "15px"
                }}>Send Request</button>
            </div>
            <br/>
            <h2>All Friends</h2>
            <div style={{
                maxWidth: "100%",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "30px",
                padding: "30px",
                paddingTop: "10px",
                paddingBottom: "10px",
            }}>
                {friends.friends.friends.length == 0 ? <p>You don't have any friends :( </p> : friends.friends.friends.map(fren=>{
                    return <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "15px",
                        marginTop: "15px"
                    }}>
                        <img style={{
                            height: "30px",
                            borderRadius: "100%",
                            width: "auto",
                            marginRight: "10px"
                        }} src={fren.picture}></img>
                        <p style={{margin: "0px", marginTop: "5px"}}>{fren.username}</p>
                    </div>
                })}
            </div>
            <br/>
            <h2>Friend Requests</h2>
            <div style={{
                maxWidth: "100%",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "30px",
                padding: "30px",
                paddingTop: "10px",
                paddingBottom: "10px",
            }}>
            {friends.friends.requests.length == 0 ? <p>You don't have any friend requests :( </p> : friends.friends.requests.map(fren=>{
                    return <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "15px",
                        marginTop: "15px"
                    }}>
                        <img style={{
                            height: "30px",
                            borderRadius: "100%",
                            width: "auto",
                            marginRight: "10px"
                        }} src={fren.picture}></img>
                        <p style={{margin: "0px", marginTop: "5px", maxWidth: "100%", width: "100%"}}>{fren.username}</p>
                        <button style={{
                            backgroundColor: "#140F26",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                            padding: "30px",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            fontSize: "15px",
                            color: "white",
                            border: "0px",
                            outline: "none",
                            borderRadius: "30px",
                            marginLeft: "15px"
                        }} onClick={()=>dispatch(acceptFriendRequest(auth.jwt, fren.email))}>Accept</button>
                    </div>
            })}
            </div>
        </div>
    )
}
