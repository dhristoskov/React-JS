import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/authContext/authState';
import RequestState from './context/requestContext/requestState';
import ShopState from './context/shopContext/shopState';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import setAuthToken from './context/setAuthToken';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddShops from './components/Shop/AddShops/AddShops';
import RequestForm from './components/Requests/RequestForm/RequestForm';
import RequestList from './components/Requests/RequestList/RequestList';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
        <RequestState>
          <ShopState>
          <Router>
            <NavBar />
            <SideBar />
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/addshops' component={AddShops} />
                  <PrivateRoute exact path='/create' component={RequestForm} />
                  <PrivateRoute exact path='/reqlist' component={RequestList} />
              </Switch>
          </Router>
          </ShopState>
        </RequestState>     
    </AuthState>
  );
}

export default App;
