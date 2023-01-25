import { Button, Modal, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
              return <div className="friends-list-each">
            <img src={fren.picture}></img>
            <p>{fren.username}</p>
            <Button style={{marginLeft: "15px", backgroundColor: "green", color: "white", border: "0px"}} onClick={()=>{
              const result = groupFriends.slice();
              result.push(fren.email);
              setGroupFriends(result);
            }}>Add</Button>
        </div>
            }
          })} 
        </Modal>
          <br/><br/>
          <div className="all-content">
            <h1>All Chats</h1>
            <Button onClick={()=>{
              setIsModalOpen(true);
            }} type={"primary"}>New Conversation</Button>
            <br/><br/>
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
