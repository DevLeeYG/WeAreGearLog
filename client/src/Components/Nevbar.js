import { useState, useRef, useEffect } from 'react';
import logo from '../Img/LOGO.png';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './common/SidebarData';
import { IconContext } from 'react-icons';
import { FaUserCircle } from 'react-icons/fa';

import InfoMd from './InfoMd';

const NavBar = ({ isLogin, setIsLogin, setAuthRegi, authRegi }) => {
  const modalFalse = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    setIsOpen(true);
  }, [isLogin]);

  const postLogout = () => {
    return axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data.message === '로그아웃 성공') {
          localStorage.clear();
          setAuthRegi({
            email: '',
            username: '',
            password: '',
            passwordCornfirm: '',
          });

          setIsLogin(false);

          alert('로그아웃되었습니다');
          history.push('/');
        }
      })
      .catch((err) => {
        if (err) {
        
          alert('로그아웃이 되지않았습니다');
        }
      });
  };

  const onMypage = (id) => {
   
    if (id === '/account/mypage' && isLogin === false) {
      history.push('/');
      alert('로그인을 해주세요');
    } else {
      history.push(id);
    }
  };

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <i>
            <Link to="#" className="menu-bars">
              <GiHamburgerMenu className="close" onClick={showSidebar} />
            </Link>
          </i>
          <div className="Logo-box">
            <Link to="/">
              <img className="Logo-name" alt="" src={logo} />
            </Link>
          </div>

          <div className="nav-list">
            <Link to="/brands/list">
              <li className="nav-pad-1">Gear Review</li>
            </Link>
          </div>

          <div className="nav-list">
            <Link to="/board/">
              <li className="nav-pad-1">Board</li>
            </Link>
          </div>
          <div className="nav-list">
            <Link to="/used/store">
              <li className="nav-pad-1">Used</li>
            </Link>
          </div>

          <div>
            {!isLogin ? (
              <i
                className="icons"
                onClick={() => history.push('/account/login')}
              >
                <FaUserCircle size="25" />
              </i>
            ) : (
              <i>
                {
                  <div className="icons2" onClick={() => setIsOpen(!isOpen)}>
                    <div>{authRegi.username} ▿</div>
                  </div>
                }
              </i>
            )}
            {isLogin && !isOpen ? (
              <InfoMd
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                postLogout={postLogout}
              />
            ) : null}
          </div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" value="" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <span onClick={() => onMypage(item.path)}>{item.title}</span>
                  <hr></hr>
                </li>
              );
            })}
            <div className="menu-p"></div>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default NavBar;
