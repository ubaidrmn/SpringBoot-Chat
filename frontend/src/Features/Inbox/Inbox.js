import { Button, Modal, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createChat, getChats } from "./InboxThunks";

export default function Inbox(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);
  const inbox = useSelector(state=>state.inbox);
  const friends = useSelector(state=>state.friends);
  const [groupFriends, setGroupFriends] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    const newGroupFriends = groupFriends;
    newGroupFriends.push(auth.userData.email);
    dispatch(createChat(auth.token, auth.userData.email, newGroupFriends));
    setGroupFriends([]);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setGroupFriends([]);
  };
  
  useEffect(()=>{
    if (inbox.chatsInitialized) {
      const newDataSource = []
      let i = 0;
      inbox.chats.forEach(chat=>{
        i+=1;
        newDataSource.push({
          key: i,
          title: chat.title,
          id: chat.id
        })
      })
      setDataSource(newDataSource);
    }
  },[inbox])

  useEffect(()=>{
    console.log(groupFriends);
  },[groupFriends])

    return (
        <>
        <Modal title="Start a new group conversation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {friends.friends.friends.map(fren=>{
            if (!groupFriends.includes(fren.email)) {
              return <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "20px",
                        marginTop: "20px"
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
                        }} onClick={()=>{
                          const result = groupFriends.slice();
                          result.push(fren.email);
                          setGroupFriends(result);
                        }}>Add</button>
                    </div>
            }
          })} 
        </Modal>
          <br/><br/>
          <div className="all-content">
                <button onClick={()=>{
                  setIsModalOpen(true);
                }} style={{
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
                }}>New Group Conversation</button>
                <br/><br/>
            <h2>All Chats</h2>
            <div>
              <Table dataSource={dataSource}>
              <Column
                key="chat"
                render={(chat) => (
                  <Link to={`/chat/${chat.id}`}>{chat.title}</Link>
                )}
              />
              </Table>
            </div>
          </div>
        </>
    );
}
