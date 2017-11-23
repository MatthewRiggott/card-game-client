import React, {Component} from 'react';
import Game from '../../api/Game';
import Storage from '../../api/Storage';
import './GamesListing.css';

class GamesListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      games: []
    }
  }

  joinGame = (gameOptions) => {
    const game = new Game(gameOptions);
    game.join().then(response => {
      if(response.status == 200) {
        const data = response.data
        const joinedGame = new Game({
          player_id: response.data.player_id,
          id: data.game_id,
          name: data.game_name,
        });
        Storage.AddGame(joinedGame);
        //TODO: Load game wait component
      } else {
        console.log(`Input Error: ${response.message}: ${response.error}`);
      }
    }).catch( e => {
      console.log("Server Error Caught.");
    })
  }

  componentDidMount() {
    Game.findAll().then(data => {
      const games = data.map(g => ({ name: g.name, status: g.status, id: g.id }));
      this.setState({
        isLoading: false,
        games
      });
    }).catch(e => {
      this.setState({
        isLoading: false,
        isError: true,
      });
    })
  }

  render() {
    let content;
    if(this.state.error) {
      content = <p>An error has occurred.</p>;
    } else if(this.state.isLoading) {
      content = <p>Loading open games from server.</p>;
    } else if(this.state.games) {
      content = this.state.games.map(g => (<div key={g.id} className="gameRoom">
        <p className="name">{ g.name }</p>
        <p className="status">{ g.status }</p>
        <div className="joinWrapper">
          <button type="button" onClick={ () => this.joinGame({name: g.name, id: g.id}) } >Join Room</button>
        </div>
      </div>));
    } else {
      content = <p>The lobby is empty, create a new game.</p>;
    }
    return (
      <div className="GamesListing">
        <div className="fullWidth">
          <h1>Games Listing</h1>
        </div>
        { content }
      </div>
    );
  }
}

export default GamesListing;
