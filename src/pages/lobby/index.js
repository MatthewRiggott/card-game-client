import React, {Component} from 'react';
import CreateGame from './CreateGame';
import GamesListing from './GamesListing';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createGame: false,
    }
  }

  openRoomCreate = () => {
    this.setState({
      createGame: true,
    })
  }


  render() {
    return (
      <div className="Lobby">
        <CreateGame isOpen={this.state.createGame} />
        <button type='button' onClick={ () => this.openRoomCreate() }>Create Room</button>
        <GamesListing />
      </div>
    );
  }
}

export default Lobby;