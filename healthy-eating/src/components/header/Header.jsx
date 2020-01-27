import React from 'react';
import { Link } from "react-router-dom";

//Header Component
function Header () {
    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <Link to="/"><h2>LOGO</h2></Link>
                </div>
                <div className="settings">
                    <ul>
                        <Link to="/register" ><li>Register</li></Link>
                        <Link to="/login" ><li>Login</li></Link>
                        <Link to="/account" ><li>Account</li></Link>
                        <Link to="/logout" ><li>Logout</li></Link>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;