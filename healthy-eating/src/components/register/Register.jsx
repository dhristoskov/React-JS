import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../config/firebase';
import Header from '../header/Header';
import Footer from '../footer/Footer'

const RegisterPage = () => (
        <div>
            <Header />
                <h3>Registration</h3>
                <RegisterForm />
            <Footer />
        </div>
      );
    

function RegisterForm(props) {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [repeatePassword, setRepeatePassword] = useState('')
    
    

	return (

		<form className="registration-form" onSubmit={e => e.preventDefault() && false }>
            <div>
                <input name="name" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>   
            </div>
            <div>
                <input name="email" type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)}/>    
            </div>
            <div>
                <input name="password" type="password" placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <input name="repeatePassword" type="password" placeholder="Confirm Password" value={repeatePassword} onChange={e => setRepeatePassword(e.target.value)}  />
            </div>
            <div>
                <button type="submit" onClick={onRegister}>Register</button>
            </div>
		</form>
    )

	async function onRegister() {
		try {
            await firebase.register(name, email, password)
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(RegisterPage);



// <button disabled={isInvalid} type="submit">Register</button>

