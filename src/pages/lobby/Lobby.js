import React, {Component} from 'react';
import CreateGame from './CreateGame';
import GamesListing from './GamesListing';
import WaitingRoom from './WaitingRoom';
import './Lobby.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateGame: false,
      showWaitingRoom: false,
      activeGame: {},
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

  openWaitingRoom = (game, isHost) => {
    this.setState({
      showCreateGame: false,
      showWaitingRoom: true,
      activeGame: game,
      isHost: isHost,
    });
  }

  closeWaitingRoom = () => {
    this.setState({
      showWaitingRoom: false,
      activeGame: {},
    });
  }

  render() {
    const state = this.state;
    return (
      <div className="Lobby">
        <CreateGame isOpen={ state.showCreateGame } onClose={() => this.closeRoomCreate()} openRoom={(game) => this.openWaitingRoom(game, true)}/>
        <WaitingRoom game={state.activeGame} onGameStarting={(gameState) =>this.props.startGame(gameState)} isHost={ state.isHost } isOpen={ state.showWaitingRoom } onClose={ () => this.closeWaitingRoom() } />
        <button className="createRoom" type='button' onClick={ () => this.openRoomCreate() }>Create Room</button>
        <GamesListing joinGame={(game) => this.openWaitingRoom(game, false)} isPolling={!state.showCreateGame && !state.showWaitingRoom} />
      </div>
    );
  }
}

export default Lobby;
