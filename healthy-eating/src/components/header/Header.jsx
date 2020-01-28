import React from 'react';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes'


//Header Component
function Header () {
    return(
        <header className="header">
            <nav>
                <div className="logo">
                    <Link to={ROUTES.HOME}><h2>LOGO</h2></Link>
                </div>
                <div className="settings">
                    <ul>
                        <Link to={ROUTES.REGISTER}><li>Register</li></Link>
                        <Link to={ROUTES.LOGIN}><li>Login</li></Link>
                        <Link to={ROUTES.ACCOUNT}><li>Account</li></Link>
                        <Link to="/logout" ><li>Logout</li></Link>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;