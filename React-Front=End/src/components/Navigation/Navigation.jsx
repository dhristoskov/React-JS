import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';

const Navigation = () => {

const { logout, isAuthenticated, clearErrors } = useContext(AuthContext);

//User Logout
const onLogout = () => {
    logout();
    clearErrors();
};


//Logged-In User Navbar
const isLoggedInUser = (
    <Fragment>
        <li>
            <Link to='/' style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>Home</Link>
        </li>
        <li>
            <Link to='/about' style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>About</Link>
        </li>
        <li>
            <Link to='/account' style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>Account</Link>
        </li>
        <li>
            <Link to='/' onClick={onLogout} style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>LogOut</Link>
        </li>  
    </Fragment>
);

//Guest Navbar
const guestUser = (
    <Fragment>
        <li>
            <Link to='/' style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>Home</Link>
        </li>
        <li>
            <Link to='/about' style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>About</Link>
        </li> 
        <li>
            <Link to='/login' style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>Log-in</Link>
        </li>
        <li>
            <Link to='/register' style={{ textDecoration: 'none', color: '#f2f2f2', fontWeight: '600'}}>Registration</Link>
        </li>
        
    </Fragment>
);

    return(
        <Fragment>     
            <nav>
                <div className="container">
                    <div className="logo">React App</div>
                    <div className="menu">
                        <ul className="settings">
                           {isAuthenticated ? isLoggedInUser : guestUser}
                        </ul>
                    </div>
                </div>     
            </nav>
        </Fragment>
    )
}

export default Navigation;