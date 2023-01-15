import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 70,
      color: "white"
    }}
    spin
  />
);

export default function Loader(props) {

    const appState = useSelector(state=>state.app);

    return appState.isLoading ? 
        <div style={{
            height: "100%", 
            width: "100%", 
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            top: "0px",
            zIndex: "999"
        }}>
            <Spin indicator={antIcon} />
        </div>
        : null
}