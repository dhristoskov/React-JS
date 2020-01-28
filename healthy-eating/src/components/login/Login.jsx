import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import firebase from '../../config/firebase'

const LoginPage = () => (
    <div>
        <Header />
            <h3>Log-in</h3>
            <LoginForm />
        <Footer />
    </div>
  );

//Login Form - FireBase
function LoginForm (params) {

    const [login_email, setEmail] = useState('');
    const [login_password, setPassword] = useState('');

    return (
        <form className="login-form">
            <div>
                <input type="email" name="login_email" placeholder="E-mail"
                value={login_email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div>
                <input type="password" name="login_password" placeholder="Password"
                value={login_password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button type="submit" onClick={login}>Login</button>
        </form>
    
    );

    //Login method onClick
    async function login () {

        try {
            await firebase.login(login_email, login_password)
        }catch(error){
            alert(error.message)
        }
    }
}

export default LoginPage;