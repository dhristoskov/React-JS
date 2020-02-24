import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/authContext/authState';
import ReserveState from './context/reserveContext/reserveState';
import setAuthToken from './context/setAuthToken';
import LandingPage from './components/LandingPage/LandingPage';
import Registration from './components/Registration/Registration';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import AboutPage from './components/About/About';
import UserAccount from './components/UserAccount/UserAccount';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ReserveState>
        <Router>
          <Fragment>
            <Navigation />
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Registration} />
                <PrivateRoute exact path='/account' component={UserAccount} />
                <Route exact path='/about' component={AboutPage} />
            </Switch>
          </Fragment>
        </Router>
      </ReserveState>
    </AuthState>
  );
}

export default App;
