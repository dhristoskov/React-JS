import React, {Fragment, useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { GiHummingbird } from 'react-icons/gi';
import AuthContext from '../../context/authContext/authContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Global from '../../styles/globalStyle';

const Header = styled.header`
    background: #DFC989;
    display: flex;
    align-items: center;
    min-height: 16vh;
    justify-content: space-between;
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    color: #1A021E;
    padding: 1rem 2rem;
`;

const Logo = styled.div`
    color: #1A021E;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size:20px;
`;

const SubText = styled.p`
    color: #1A021E;
    letter-spacing: 3px;
    font-size:10px;
    text-align: start;
`;

const Ul = styled.ul`
    display: flex;
    justify-content: space-around;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size:12px;
`;

const Li = styled.li`
    list-style: none;
    padding: 0 1rem;
    text-decoration: none;
    cursor: pointer;
`;

const Navigation = () => {

    const { user, logout, isAuthencated, clearErrors } = useContext(AuthContext)

    const onLogout = () => {
        logout();
        clearErrors();
      }

    const loggedIn = (
        <Fragment>
          <Li>
            <Link to='/home' style={{ textDecoration: 'none', color: '#1A021E', fontWeight: '700' }}>
              Welcome, {user && user.name}</Link> 
          </Li>
          <Li>
            <Link to='/about' style={{ textDecoration: 'none', color: '#1A021E', fontWeight: '700' }}>About</Link>
          </Li>
          <Li>
            <Link to='/tasks' style={{ textDecoration: 'none', color: '#1A021E', fontWeight: '700' }}>Tasks</Link>
          </Li>
          <Li>
            <Link to='/' style={{ textDecoration: 'none', color: '#1A021E', fontWeight: '700' }} 
            onClick={onLogout}><span className="sm-hide">Logout</span><FaSignOutAlt /></Link>
          </Li> 
        </Fragment>
    ); 

    const guest = (
        <Fragment>
          <Li>
            <Link to='/register' style={{ textDecoration: 'none', color: '#1A021E', fontWeight: '700'}}>Register</Link>
          </Li>
          <Li>
            <Link to='/login' style={{ textDecoration: 'none', color: '#1A021E', fontWeight: '700' }}>Login</Link>
          </Li>
          <Li>
            <Link to='/about' style={{ textDecoration: 'none', color: '#1A021E', fontWeight: '700' }}>About</Link>
          </Li>
        </Fragment>
    );

    return (
      <Fragment>
        <Global />
          <Header className='navigation'>
            <div className="logo-container">
              <Logo className="logo"><GiHummingbird /><Link to='/' style={{ textDecoration: 'none', color: '#1A021E' }}>The Perfect Day </Link></Logo>
              <SubText>and the story begins</SubText>
            </div>
            <Ul className="settings">
              {isAuthencated ? loggedIn : guest}
            </Ul>
          </Header>
      </Fragment>
    )
}

export default Navigation;