import { Breadcrumb, Layout, Menu, theme, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedOut } from '../Features/Authentication/AuthenticationSlice';
import { LoadingOutlined } from '@ant-design/icons';
import Loader from './Loader';
import { useCookies } from 'react-cookie';

const { Header, Content, Footer } = Layout;

export default function AppHeader(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);
  const app = useSelector(state=>state.app);
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);

  return (
        <>
        <Loader />
          <div className='header'>
            <div className='all-content'>
              <div className='header-child'>
                <div className='header-child-child-1'>
                  <Link to="/friends"><p>Friends</p></Link>
                  <Link to="/inbox"><p>Inbox</p></Link>
                  { auth.loggedIn ?
                    <Link onClick={()=>{
                      dispatch(setLoggedOut());
                      removeCookie("auth-token")
                    }}><p>Logout</p></Link> : null
                  }
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
