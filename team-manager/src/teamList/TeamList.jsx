import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Team = props => (
  <tr>
    <td>{props.team.username}</td>
    <td>{props.team.description}</td>
    <td>{props.team.duration}</td>
    <td>{props.team.date.substring(0,10)}</td>
  <td>
      <Link to={"/edit/"+props.team._id}>edit</Link> |
      <Link to='#' onClick={() => { props.deleteTeam(props.team._id) }}>delete</Link>
    </td>
  </tr>
)

class TeamList extends Component {
  constructor(props) {
    super(props);

    this.deleteTeam = this.deleteTeam.bind(this)

    this.state = {teams: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/teams/')
      .then(response => {
        this.setState({ teams: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTeam(id) {
    axios.delete('http://localhost:5000/teams/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      teams: this.state.teams.filter(el => el._id !== id)
    })
  }

  teamList() {
    return this.state.teams.map(currentTeam => {
      return <Team team={currentTeam} deleteTeam={this.deleteTeam} key={currentTeam._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.teamList() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default TeamList;