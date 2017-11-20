import React, {Component} from 'react';
import CreateGame from './CreateGame';
import GamesListing from './GamesListing';
import './Lobby.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateGame: false,
    }
  }

  openRoomCreate = () => {
    this.setState({
      showCreateGame: true,
    });
  }

  closeRoomCreate = () => {
    this.setState({
      showCreateGame: false,
    });
  }


  render() {
    return (
      <div className="Lobby">
        <CreateGame isOpen={ this.state.showCreateGame } onClose={() => this.closeRoomCreate() }/>
        <button className="createRoom" type='button' onClick={ () => this.openRoomCreate() }>Create Room</button>
        <GamesListing />
      </div>
    );
  }
}

export default Lobby;