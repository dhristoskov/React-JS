/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import { Auth } from '../context/authContext';


const Register = () => (
    <div>
        <Header />
            <RegisterForm />
        <Footer />
    </div>
);

const RegisterForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    const {state, dispatch} = React.useContext(Auth); 
    
    
    const register = async(e) => {

        e.preventDefault();
        
        let response = await firebase.register(email, password);
        if(response.hasOwnProperty("message")){
            console.log(response.message);
        }else{
            console.log(response.user);
            setRouteRedirect(true);
            return dispatch({
                type: "REGISTER",
                payload: response.user
            })
        }
    };

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    };

    const isInvalide = email === '' || password === '' || password.length < 6
    || repeatPassword.length < 6 || name === '' || password !== repeatPassword;

    return ( 
        <form className="registration-form" onSubmit={register}>
            <div>
                <input type="text" placeholder="Name"
                required value={name} onChange={e => setName(e.target.value)}></input>
            </div>
            <div>
                <input type="email" placeholder="E-mail"
                required value={email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div>
                <input type="password" placeholder="Password" 
                required value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <div>
                <input type="password" placeholder="Repeat Password" 
                required value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}></input>
            </div>
                <button disabled={isInvalide} type="submit">Create Account</button>
                <p>Do you have an account? <Link to="/login">LogIn</Link></p>
            </form>
    );

}

export default Register;