import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/layouts/Navigation';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import AuthState from './context/authContext/AuthState';
import setAuthToken from './context/setAuthToken';
import About from './components/pages/About';
import Tasks from './components/tasks/TaskForm';
import GuestState from './context/guestContext/guestState';
import TaskState from './context/taskContext/taskState';
import LandingPage from './components/pages/LandingPage';
import PrivateRouting from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <GuestState>
        <TaskState>
          <Router>
            <div>
              <Navigation />
              <Switch>
                <Route exact path='/' component={LandingPage}/>
                <PrivateRouting exact path='/home' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/tasks' component={Tasks} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Router>
        </TaskState>
      </GuestState>
    </AuthState>
  );
}

export default App;
