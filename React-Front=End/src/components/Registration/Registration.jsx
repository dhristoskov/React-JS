import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';

const RegitrationForm = (props) => { 

  const { register,  isAuthenticated, error, clearErrors, setError } = useContext(AuthContext);

  useEffect(() => {
    if( isAuthenticated ){
      props.history.push('/');
    }
  }, [ isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;
  onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    if (error !== null) 
    {
      clearErrors();
    }
  };

  onsubmit = (event) => {
    event.preventDefault()
    if (password !== password2) {
      setError('Password does not match');
    } else {
      register({ name, email, password });
    };
  };

    return (
      <div className="image">  
        <div className="register">
          <h2 className="registerHeader">Registration</h2>
          <p className="subName">Make a registration</p>
          <form className='registerForm'>
            <input type="text" name="name" placeholder="Name" value={name} onChange={onchange}/>
            <input type="email" name="email" placeholder="Email" value={email} onChange={onchange}/>
            <input type="password" name="password" placeholder="Password" value={password} onChange={onchange}/>
            <input type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={onchange} required/>
            <input type="submit" value="Register" className="btn" />
          </form>
          <div className="question">
          {error !== null && error.map(err => <button className="danger" type="button">
            {err.msg} <span onClick={() => clearErrors()}>X</span></button>)}
            <p className="question">Already have an accout? {' '}<Link to='/login' 
            style={{ color: '#f2f2f2' }}>LogIn</Link></p>
          </div>
        </div >
       </div>
      )
}

export default RegitrationForm;