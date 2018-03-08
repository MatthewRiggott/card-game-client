import React, { Component } from 'react';
import { graphql, mutate } from 'react-apollo';
import EventGQL from '../../api/Game';
import Storage from '../../api/Storage';

class JoinGameTile extends Component {
  constructor(props) {
    super(props);
  }

  tryJoin = () => {
    this.props.mutate({
      variables: { gameId: this.props.game.id }
    }).then(response => {
      const data = response.data.joinGame;
      const joinedGame = data.game;
      const joinGameCreds = Object.assign(joinedGame, {player_id: data.player_id});
      Storage.AddGame(joinGameCreds);
      this.props.joinGame(joinedGame);
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    const game = this.props.game;
    return (
      <div className="JoinGameTile">
        <p className="name">{ game.name }</p>
        <p className="status">{ game.status }</p>
        <p className="status">{ game.players_count }</p>
        <div className="joinWrapper">
          <button type="button" onClick={ () => this.tryJoin() } >Join Room</button>
        </div>
      </div>
    );
  }
};

export default graphql(EventGQL.joinGame)(JoinGameTile);