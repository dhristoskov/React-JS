import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import styled from 'styled-components';


const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFF;
  padding: 40px;
  width: 380px;
  border-radius: 6px; 
  text-align: center;
  margin: 2rem auto 80px;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  outline: none;
  padding: 10px;
  border: solid 1px black;
  margin-bottom: 0.3rem;
`;

const LoginBtn = styled.input`
  height: 40px;
  width: 100%;
  outline: none;
  padding: 10px;
  border: none;
  margin-bottom: 1rem;
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

const Login = (props) => {
  const { login, isAuthencated, error, clearErrors } = useContext(AuthContext)
  useEffect(() => {
    if (isAuthencated) {
      props.history.push('/home')
      clearErrors()
    } else {
      clearErrors()
    }
    // eslint-disable-next-line
  }, [isAuthencated, props.history])
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { email, password } = user

  const onchange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    if (error !== null) { clearErrors() }
  }
  const onsubmit = e => {
    e.preventDefault()
    login({
      email,
      password
    })
    clearErrors()
  }

  const isInvalide = email === '' || password === "" || password.length < 6;

  return (
    <LoginForm className="login">
      <Title>Welcome Back</Title>
      <SubTitle>Enter your credentials to log-in</SubTitle>
      <form onSubmit={onsubmit}>
        <Input type="email" name="email" placeholder="Email" value={email} onChange={onchange} />
        <Input type="password" name="password" placeholder="Password" value={password} onChange={onchange} required />
        <LoginBtn  disabled={isInvalide} type="submit" value="Login" className="btn" />
      </form>
      <div className="question">
        {error !== null && <button className="danger" type="button"  >{error} <span onClick={() => clearErrors()}>Clear</span></button>}
        <p>Dont' have an accout? {" "} <Link to='/register'>Create one</Link></p>
      </div>
    </LoginForm>
  )
}
export default Login