import React, {Component} from 'react';
import Modal from 'react-modal';
import GameGQL from '../../api/Game';
import Storage from '../../api/Storage';
import { graphql, mutate } from 'react-apollo';

const CreateGameStyle = {
  content: {
    padding: '10px',
    maxWidth: '400px',
    maxHeight: '300px',
    margin: 'auto',
  }
};

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
    }
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  createGame = () => {
    this.props.mutate({
      variables: { gameName: this.state.name }
    }).then(response => {
      const data = response.data.createGame;
      const newGame = data.game;
      const newGameWithCreds = Object.assign(newGame, {player_id: data.player_id});
      Storage.AddGame(newGameWithCreds);
      this.props.openRoom(newGame);
    }).catch(err => {
      console.log(err);
    })
  }

  cancel = () => {
    this.props.onClose();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Create Game"
        style={ CreateGameStyle } >
        <div className="grid" >
          <div className="flexCenter"><h1>Create Game</h1></div>
          <div className="flexCenter">
            <label htmlFor="gameName">Name of Room: </label>
            <input name="gameName" type="text" maxLength={ 16 } onChange={(e) => this.handleNameChange(e)}/>
          </div>
          <div className="flexCenter">
            <button type='button' onClick={() => this.createGame() }>Create New Game</button>
            <button type='button' onClick={() => this.cancel() }>Cancel</button>  
          </div>
        </div>
      </Modal>
    );
  }
}

CreateGame.defaultProps = {
  isOpen: false,
}

export default graphql(GameGQL.createGame)(CreateGame);
