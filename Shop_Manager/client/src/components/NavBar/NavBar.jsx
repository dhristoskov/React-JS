import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import './NavBar.css'

const NavBar = () => {

    const { logout, isAuthenticated, clearErrors } = useContext(AuthContext);

    //User LogOut
    const onLogout = () => {
        logout();
        clearErrors();
    }

    const isGuestUser = (
        <Fragment>
            <Link to='/' style={{textDecoration: 'none'}}><li lang="bg" >Начало</li></Link>
            <Link to='/register' style={{textDecoration: 'none'}}><li lang="bg">Регистрация</li></Link>
            <Link to='/login' style={{textDecoration: 'none'}}><li lang="bg">Вход</li></Link>
        </Fragment>
    )

    const isLoggedIn = (
        <Fragment>
            <Link to='/' style={{textDecoration: 'none'}}><li lang="bg">Начало</li></Link>
            <Link to='/addshops' style={{textDecoration: 'none'}}><li lang="bg">Нов обект</li></Link>
            <Link to='/' style={{textDecoration: 'none'}} onClick={onLogout}><li lang="bg">Излез</li></Link>
        </Fragment>
    )
 
    return(
        <nav>
            <div className="logo">
                <h3>MagazinDB</h3>
            </div>
            <ul className="settings">
                { isAuthenticated ? isLoggedIn : isGuestUser }
            </ul>
            <div className="burger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}

export default NavBar;
