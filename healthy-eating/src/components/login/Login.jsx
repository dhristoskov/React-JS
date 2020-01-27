import React, { Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';

function Login (params) {
    return (
        <Fragment>
            <Header />
    <       form className="login-form">
                <div>
                    <input type="email" id="login-email" placeholder="E-mail" required></input>
                </div>
                <div>
                    <input type="password" id="login-password" placeholder="Password" required></input>
                </div>
                <button type="submit">Login</button>
            </form>
            <Footer />
        </Fragment>       
    );
}

export default Login;