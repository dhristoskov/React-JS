import React from 'react';
import { Switch, Route } from "react-router-dom";
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import Account from './account/Account';
import PasswordForgot from './passwordForgot/PasswordForgot';
import Cookbook from './cookbook/Cookbook';
import Recipe from './recipe/Recipe';

function Navigation () {
    return(
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/account" component={Account}></Route>
            <Route exact path="/cookbook" component={Cookbook}></Route>
            <Route exact path="/recipe/:id" component={Recipe}></Route>
            <Route exact path="/pw-forgot" component={PasswordForgot}></Route>
        </Switch>
    );
}

export default Navigation;