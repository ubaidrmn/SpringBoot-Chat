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
            <Input.Group compact>
                <Input id="add-email" style={{ width: 'calc(100% - 200px)' }} placeholder="Email Address" />
                <Button onClick={()=>{
                    dispatch(sendFriendRequest(auth.jwt, document.getElementById("add-email").value))
                }} type="primary">Send Request</Button>
            </Input.Group>
            <h1>All Friends</h1>
            {friends.friends.friends.length == 0 ? <p>You don't have any friends :( </p> : friends.friends.friends.map(fren=>{
                return <div className="friends-list-each">
                    <img src={fren.picture}></img>
                    <p>{fren.username}</p>
                </div>
            })}
            <h1>Friend Requests</h1>
            {friends.friends.requests.length == 0 ? <p>You don't have any friend requests :( </p> : friends.friends.requests.map(fren=>{
                return <div className="friends-list-each">
                    <img src={fren.picture}></img>
                    <p>{fren.username}</p>
                    <Button style={{marginLeft: "15px", backgroundColor: "green", color: "white", border: "0px"}} onClick={()=>{
                        dispatch(acceptFriendRequest(auth.jwt,fren.email))
                    }}>Accept</Button>
                </div>
            })}
        </div>
    )
}
