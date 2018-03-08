import React, { Component } from 'react';
import GameGQL from '../../api/Game';
import { graphql } from 'react-apollo';
import './RegistrationModal.css';

class RegistrationModal extends Component {
  constructor(props) {
    super(props)
    this.state = { playerName: "" }
  }

  handleChange = (e) => {
    this.setState({
      playerName: e.target.value
    });
  }

  onUserSubmit = async () => {
    const playerName = this.state.playerName;
    try {
      const result = await this.props.mutate({
        variables: {
          playerName
        },
      })
      const currentPlayer = result.data.createPlayer;
      localStorage.currentPlayer = currentPlayer;
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="RegistrationModal">
        <div className="row">
          <h1>Register</h1>
        </div>
        <div className="row">
          <label htmlFor="name">Enter a username:</label>
          <input type="text" name="name" minLength="3" onChange={(e) => this.handleChange(e)} />
        </div>
        <button type="button" onClick={() => this.onUserSubmit()}>
          Enter
        </button>
      </div>
    );
  }
}

export default graphql(GameGQL.createPlayer)(RegistrationModal);