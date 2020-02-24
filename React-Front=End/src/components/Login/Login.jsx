import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';

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

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password} = user;

  const onchange = event => {
    setUser({...user, [event.target.name]: event.target.value});
    if (error !== null) { 
      clearErrors(); 
    }
  }

  const onsubmit = event => {
    event.preventDefault()
    login({ email, password });
    clearErrors();
  }

    return (
      <div className="image">
          <div className="login">
            <h2 className="loginHeader">Welcome Back</h2>
            <p className="subName">Enter your credentials to log-in</p>
            <form className='loginForm' onSubmit={onsubmit}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={onchange} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={onchange} required/>
                <input type="submit" value="Log-in" className="btn" />
            </form>
            <div className="question">
            {error !== null && <button className="danger" type="button">
              {error} <span onClick={() => clearErrors()}>Clear</span></button>}
              <p>Dont' have an accout yet? {" "}  <Link to='/register' 
              style={{ color: '#f2f2f2' }}>Create your Account</Link></p>
            </div>
          </div>
      </div>
      )
}

export default Login;