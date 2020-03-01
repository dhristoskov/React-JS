import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import './Register.css';

const Register = (props) => {

  const { register, isAuthenticated, error, clearErrors, setError  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
    if (error !== null) {
      clearErrors();
    }
  };

  const onsubmit = (event) => {
    event.preventDefault()
    if (password !== password2) {
      setError('Паролите не са еднакви')
    } else {
      register({ name, email, password });
    }
  };

    return ( 
          <div className="register">
            <h2 className="registerHeader">Регистрация</h2>
            <p className="subName">Въведи своите данни</p>
            <form className='registerForm' onSubmit={onsubmit}>
              <input type="text" name="name" placeholder="Име" 
              value={name} onChange={onchange} />
              <input type="email" name="email" placeholder="Ел. поща"
               value={email} onChange={onchange} />
              <input type="password" name="password" placeholder="Парола"
               value={password} onChange={onchange} />
              <input type="password" name="password2" placeholder="Повотори парола" 
              value={password2} onChange={onchange} required />
              <input type="submit" value="Регистрация" className="btn" />
            </form>
            <div className="question">
             {error !== null && error.map(err => <button className="danger" type="button">{err.msg}
             <span onClick={() => clearErrors()}>X</span></button>)}
              <p className="question">Вече имаш регистрация? {' '}<Link to='/login'>Вход</Link></p>
            </div>
          </div >
        )
}
export default Register;