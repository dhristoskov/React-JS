import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import CreateUser from './components/creaateUser/CreateUser';
import TeamList from './components/teamList/TeamList';
import CreateTeam from './components/createTeam/CreateTeam';
import EditTeam from './components/editTeam/EditTeam'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <br/>
        <Route path="/" exact component={TeamList}/>
        <Route path="/user" component={CreateUser}/>
        <Route path="/create" component={CreateTeam}/>
        <Route path="/edit/:id" component={EditTeam}/>
      </div>
    </Router>
  );
}

export default App;
