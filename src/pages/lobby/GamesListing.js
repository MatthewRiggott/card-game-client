import React, {Component} from 'react';
import Game from '../../api/Game';
import Storage from '../../api/Storage';

class GamesListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      games: []
    }
  }

  componentDidMount() {
    Game.findAll().then(data => {
      const games = data.map(g => ({ name: g.name, status: g.status }));
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
      content = this.state.games.map(g => (<div className="game">
        <p className="name">{ g.name }</p>
        <p className="status">{ g.status }</p>
      </div>));
    } else {
      content = <p>The lobby is empty, create a new game.</p>;
    }
    return (
      <div className="GamesListing">
        <h1>Games</h1>
        { content }
      </div>
    );
  }
}

export default GamesListing;
