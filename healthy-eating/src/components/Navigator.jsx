import React from 'react';
import { Switch, Route } from "react-router-dom";
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import Account from './account/Account';
import PasswordForgot from './passwordForgot/PasswordForgot';
import Cookbook from './cookbook/Cookbook';

function Navigation () {
    return(
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/cookbook" component={Cookbook}></Route>
            <Route path="/pw-forgot" component={PasswordForgot}></Route>
        </Switch>
    );
}

export default Navigation;