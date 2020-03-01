import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext/authContext';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = (props) => {

    const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
          props.history.push('/');
          clearErrors();
        } else {
          clearErrors();
        }
        // eslint-disable-next-line
      }, [isAuthenticated, props.history]);

      const [user, setUser] = useState({ email: '', password: '' });
      const { email, password } = user;

      const onchange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        if (error !== null) 
        { 
            clearErrors();
        }
      }

      const onsubmit = (event) => {
        event.preventDefault()
        login({ email, password });
        clearErrors();
      }

    return (
        <div className="login">
            <h2 className="loginHeader">Здравей отново</h2>
            <p className="subName">въведи своите данни, за да влезеш в сайта</p>
            <form className='loginForm' onSubmit={onsubmit}>
                <input type="email" name="email" placeholder="Ел. поща"
                 value={email} onChange={onchange} />
                <input type="password" name="password" placeholder="Парола"
                 value={password} onChange={onchange}/>
                <input type="submit" value="Вход" className="btn" />
            </form>
            <div className="question">
            {error !== null && <button className="danger" type="button"  >{error}
            <span onClick={() => clearErrors()}>X</span></button>}
            <p>Нямаш регистрация? {" "} <Link to='/register'>Създай сега</Link></p>
            </div>
        </div>
    )
}
export default Login;