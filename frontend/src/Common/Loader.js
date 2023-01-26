import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin, message, App } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingEndMessage } from '../App/AppSlice';

export default function Loader() {

    const app = useSelector(state=>state.app);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [lastMessage, setLastMessage] = useState(null);

    const info = (message) => {
      messageApi.open({
        type: 'info',
        content: message,
        duration: 3,
      });
    };

    useEffect(()=>{
      if (app.loadingEndMessage !== null && app.loadingEndMessage != lastMessage) {
        info(app.loadingEndMessage);
        dispatch(setLoadingEndMessage({loadingEndMessage: null}))
        setLastMessage(app.loadingEndMessage);
      }
    }, [app.loadingEndMessage])

    return <>
    {contextHolder}
    {app.isLoading ? 
      <div style={{
        position: "fixed",
        top: "0px",
        height: "100%",
        zIndex: "99999",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.9)"
      }}>
        <div style={{maxWidth: "100%", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: "white" }} spin />} />
        </div>
      </div>
    : null}</>
}