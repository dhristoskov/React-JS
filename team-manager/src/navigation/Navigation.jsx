import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {

  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Team-Manager</Link>
        <div>
        <ul className="setings">
          <li>
          <Link to="/" className="nav-link">Teams</Link>
          </li>
          <li>
          <Link to="/create" className="nav-link">Create Team Log</Link>
          </li>
          <li>
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
};

export default Navigation;

