import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import GameGQL from '../../api/Game';
import Storage from '../../api/Storage'
import JoinGameTile from './JoinGameTile';
import './GamesListing.css';

class GamesListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPolling: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isPolling: nextProps.isPolling,
    })
  }

  joinRoom = (game) => {
    this.setState({
      isPolling: false,
    });
    this.props.joinGame(game);
  }

  componentDidUpdate() {
    if(this.state.isPolling) {
      this.props.data.startPolling(10000);
    } else {
      this.props.data.stopPolling();
    }
  }

  componentDidMount() {
    this.props.data.startPolling(10000);
  }

  render() {
    const data = this.props.data;
    console.log(this.props);
    let content;
    if(data.error) {
      content = <p>An error has occurred.</p>;
    } else if(data.isLoading) {
      content = <p>Loading open games from server.</p>;
    } else if(data.games) {
      content = data.games.map(g => <JoinGameTile key={g.id} game={g} className="gameRoom" joinGame={(game) => this.joinRoom(game) } />);
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

export default graphql(GameGQL.lobbyListing)(GamesListing);
