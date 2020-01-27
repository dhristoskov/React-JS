import React, { Fragment, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";
import firebase from '../../config/firebase'

function Register () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    return ( 

        <Fragment>
            <Header />
            <form className="registration-form">
                <div>
                    <input type="text" id="name" placeholder="Name"
                     required value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <input type="email" id="email" placeholder="E-mail"
                     required value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" id="password" placeholder="Password" 
                    required value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" id="repeatPassword" placeholder="Repeat Password" 
                    required value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}></input>
                </div>
                <button type="submit" onClick={register}>Register</button>
            </form>
            <Footer />
        </Fragment>
    );

    async function register () {
        try{
            await firebase.register(name, email, password)
        }catch(error){
            alert('Register Fail!')
        }
    }
}

export default Register;