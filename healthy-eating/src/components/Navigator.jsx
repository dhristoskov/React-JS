import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import Account from './account/Account';
import * as ROUTES from '../constants/routes'


function Navigation () {
    return (
        <Router>
            <Route path={ROUTES.HOME} component={Home}></Route>
            <Route path={ROUTES.REGISTER} component={RegisterPage}></Route>
            <Route path={ROUTES.LOGIN} component={Login}></Route>
            <Route path={ROUTES.ACCOUNT} component={Account}></Route>
        </Router>
    );
}

export default Navigation;