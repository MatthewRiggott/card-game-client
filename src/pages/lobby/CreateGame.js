import React, {Component} from 'react';
import Modal from 'react-modal';
import Game from '../../api/Game';
import Storage from '../../api/Storage';

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
      name: '',
    }
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  createGame = () => {
    const game = new Game({name: this.state.name});
    game.create().then(response => {
      if (response.status == 200) {
        const data = response.data
        const createdGame = {
          id: data.game_id,
          name: data.game_name,
          player_id: data.player_id,
        }
        Storage.AddGame(createdGame);
      }
    }).catch(e => {
      console.log(e);
    });
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

export default CreateGame;
