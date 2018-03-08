import React, {Component} from 'react';
import Modal from 'react-modal';
import Game from '../../api/Game';
import Storage from '../../api/Storage';
import GamesPoller from '../../components/GamesPoller';

const WaitingRoomStyle = {
  content: {
    padding: '10px',
    maxWidth: '400px',
    maxHeight: '300px',
    margin: 'auto',
  }
};

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
    }
  }

  getNextState = (game) => {
    if(this.state.game.current_state != game.current_state) {
      this.setState({
        game: game
      })
    }
  }

  startGame = () => {
    
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.game) {
      this.setState({
        game: nextProps.game
      })
    }
  }

  leaveGame = () => {
    // Send API leave game
    this.cancel();
  }

  cancel = () => {
    this.props.onClose();
  }

  render() {
    const game = this.state.game;
    const startGame = this.props.isHost ? <button type='button' onClick={() => this.startGame() } >Start Game</button> : '';
    const poller = this.props.isOpen ? <GamesPoller onGameChanged={(game) => this.getNextState(game)} gameId={game.id} playerId={game.player_id} game_key={game.current_state}/> : '';
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Create Game"
        style={ WaitingRoomStyle } >
        <div className="grid" >
          <div className="flexCenter"><h2>{ game.name }</h2></div>
          <div className="flexCenter">
            <label htmlFor="gameName">Players</label>
            { game.players_count }
          </div>
          <div className="flexCenter">
            <button type='button' onClick={ ()=> this.leaveGame() } >Leave Game</button>
            { startGame }
          </div>
        </div>
        { poller }
      </Modal>
    );
  }
}

WaitingRoom.defaultProps = {
  isOpen: false,
}

export default WaitingRoom;