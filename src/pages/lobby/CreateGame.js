import React, {Component} from 'react';
import Modal from 'react-modal';
import Game from '../../api/Game';
import Storage from '../../api/Storage';

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
    const game = new Game(this.state.name);
    game.create().then(d => {
      if (d) {
        const createdGame = d.data.game;
        Storage.AddGame(createdGame);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} contentLabel="Create Game">
        <div className="CreateGame">
          <h1>Create Game</h1>
          <label htmlFor="gameName"></label><input name="gameName" type="text" onChange={(e) => this.handleNameChange(e)}/>
          <button type='button' onClick={() => this.createGame()}/>
        </div>
      </Modal>
    );
  }
}

CreateGame.defaultProps = {
  isOpen: false,
}

export default CreateGame;
