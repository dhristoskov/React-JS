import React, {Fragment, useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { GiHummingbird } from 'react-icons/gi';
import AuthContext from '../../context/authContext/authContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Global from '../../styles/globalStyle';

const Navigation = () => {

    const Header = styled.header`
      background-color: #DFC989;
      display: flex;
      align-items: center;
      min-height: 8vh;
      justify-content: space-around;
      font-size: 16px;
      font-family: 'Poppins', sans-serif;
      color: white;
    `;

    const Logo = styled.div`
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size:20px;
    `;

    const SubText = styled.p`
      color: #fff;
      letter-spacing: 3px;
      font-size:12px;
      text-align: center;
    `;

    const { user, logout, isAuthencated, clearErrors } = useContext(AuthContext)

    const onLogout = () => {
        logout()
        clearErrors()
      }

    const loggedIn = (
        <Fragment>
          <li>
            Welcome, {user && user.name}
          </li>
          <li>
            <a href='#!' onClick={onLogout}><span className="sm-hide">Logout</span><FaSignOutAlt /></a>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </Fragment>
    ); 

    const guest = (
        <Fragment>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </Fragment>
    );

    return (
      <Fragment>
        <Global />
          <Header className='navigation'>
            <div className="logo-container">
              <Logo className="logo"><GiHummingbird />The Perfect Day </Logo>
              <SubText>and the story begins</SubText>
            </div>
            <ul className="settings">
              {isAuthencated ? loggedIn : guest}
            </ul>
          </Header>
      </Fragment>
    )
}

export default Navigation;