import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export default function AppHeader(props) {
  const navigate = useNavigate();

    return (
        <>
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[{onClick: () => {
            navigate("/settings");
          },label:"Settings", key:1}, {onClick: () => {
            navigate("/inbox");
          }, label:"Inbox", key:2}]}
        />
      </Header>  
    </Layout>
        </>
    )
}
