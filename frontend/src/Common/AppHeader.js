import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export default function AppHeader(props) {
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);

    return (
        <>
          <div className='header'>
            <div className='all-content'>
              <div className='header-child'>
                <div className='header-child-child-1'>
                  <Link to="/inbox"><p>Inbox</p></Link>
                  <Link to="/settings"><p>Settings</p></Link>
                </div>
                <div className='header-child-child-2'>
                  {auth.loggedIn ? <Link to="/settings"><p>{auth.userData.name}</p></Link> : <Link to="/auth"><p>Login</p></Link>}                
                  <img className='header-profile-pic' src={auth.loggedIn ? auth.userData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU"}></img>
                
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
