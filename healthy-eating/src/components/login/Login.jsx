/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import { Auth } from '../context/authContext';

const Login = () => (
    <div>
        <Header />
            <LoginForm />
        <Footer />
    </div>
);

//Login Form - FireBase
const LoginForm = () => {

    const [login_email, setEmail] = useState('');
    const [login_password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    const {state, dispatch} = React.useContext(Auth);

    const login = async(e) => {
        e.preventDefault();
        
        let response = await firebase.login(login_email, login_password);
        if(response.hasOwnProperty("message")){
            console.log(response.message);
        }else{
            //console.log(response.user);
            setRouteRedirect(true);
            return dispatch({
                type: "LOGIN",
                payload: response.user
            });     
        }
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    const isInvalide = login_email === '' || login_password === '' || login_password.length < 6;

    return (
        <form className="login-form" onSubmit={login}>
            <div>
                <input type="email" name="login_email" placeholder="E-mail"
                value={login_email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div>
                <input type="password" name="login_password" placeholder="Password"
                value={login_password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button disabled={isInvalide} type="submit" value="Login">Login</button>
            <p>Don't have an Account yet? <Link to="/register">Register</Link></p>
        </form>   
    );
}

export default Login;