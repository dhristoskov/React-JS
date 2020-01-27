import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import Account from './account/Account';

function Navigation () {
    return(
        <Router>
            <Route path="/" exact component={Home}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/account" component={Account}></Route>
        </Router>
    );
}

export default Navigation;