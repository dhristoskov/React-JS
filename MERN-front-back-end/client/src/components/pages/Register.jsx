import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import styled from 'styled-components';

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFF;
  padding: 40px;
  width: 380px;
  border-radius: 6px; 
  text-align: center;
  margin: 1rem auto 80px;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  outline: none;
  padding: 10px;
  border: solid 1px black;
  margin-bottom: 0.3rem;
`;

const RegisterBtn = styled.input`
  height: 40px;
  width: 100%;
  outline: none;
  padding: 10px;
  border: none;
  margin-bottom: 20px;
  border: solid 1px black;
  cursor: pointer;
  background-color:#DFC989;
  color: #FFF;
`;


const Title = styled.h1`
    color: #DFC989;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 0.1rem;
`;

const SubTitle = styled.p`
    font-weight: 600;
    font-size: 15px;
    text-transform: lowercase;
    margin-bottom: 0.5rem;
    color: #1A021E;
`;

const Register = (props) => {
  const { register, isAuthencated, error, clearErrors, setError } = useContext(AuthContext)
  useEffect(() => {
    if (isAuthencated) {
      props.history.push('/')
    }
  }, [isAuthencated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = user
  onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    if (error !== null) {
      clearErrors()
    }
  }
  onsubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setError('Password does not match')
    } else {
      register({
        name,
        email,
        password
      })
    }
  }

  const isInvalide = email === '' || password === '' || password.length < 6
  || password2.length < 6 || name === '';

  return (
    <RegisterForm className="register">
      <Title>Register</Title>
      <SubTitle>Make a registration</SubTitle>
      <form >
        <Input type="text" name="name" placeholder="Name" value={name} onChange={onchange} />
        <Input type="email" name="email" placeholder="Email" value={email} onChange={onchange} />
        <Input type="password" name="password" placeholder="Password" value={password} onChange={onchange} />
        <Input type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={onchange} required />
        <RegisterBtn disabled={isInvalide} type="submit" value="Register" className="btn" />
      </form>
      <div className="question">
        {error !== null && error.map(err => <button className="danger" type="button">{err.msg} <span onClick={() => clearErrors()}>X</span></button>)}
        <p>Already have an accout? {" "} <Link to='/login'>LogIn</Link></p>
      </div>
    </RegisterForm >
  )
}

export default Register