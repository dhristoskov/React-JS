import React, { Fragment, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';
import firebase from '../../config/firebase'

//Login Form - FireBase
function Login (params) {

    const [login_email, setEmail] = useState('');
    const [login_password, setPassword] = useState('');

    return (
        <Fragment>
            <Header />
    <       form className="login-form">
                <div>
                    <input type="email" id="login_email" name="login_email" placeholder="E-mail"
                    value={login_email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" id="login_password" name="login_password" placeholder="Password"
                      value={login_password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" onClick={login}>Login</button>
            </form>
            <Footer />
        </Fragment>       
    );

    //Login method onClick
    async function login () {

        try {
            await firebase.login(login_email, login_password)
        }catch(error){
            alert('Fail!')
        }
    }
}

export default Login;