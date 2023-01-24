import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getChats } from "./InboxThunks";

export default function Inbox(props) {

  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);
  const inbox = useSelector(state=>state.inbox);

  const [dataSource, setDataSource] = useState([]);

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

    return (
        <>
          <br/><br/>
          <div className="all-content">
            <h1>All Chats</h1>
            <Button type={"primary"}>New Conversation</Button>
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
