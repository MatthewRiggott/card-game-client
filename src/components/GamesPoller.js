import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import GameGQL from '../api/Game';

class GamesPoller extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Don't stop polliieevving
    // Scientifically determined to be the optimal poll rate
    // TODO: Tell the api to store game_id: game_state_key in redis to save trips to db
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Will UPDATE");
    console.log(nextProps);
    console.log(nextState);
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return null;
  }
}

export default graphql(GameGQL.pollGame, {
  name: "poll",
  props: (p) => {
    console.log("next prop export");
    console.log(p);
    if(p.poll && p.poll.gamePollState && p.poll.gamePollState.game) {
      p.ownProps.onGameChanged(p.poll.gamePollState.game);
    }
  },
  options: (props) => ({
    pollInterval: 5000,
    variables: {
      playerId: props.playerId,
      gameId: props.gameId,
      gameState: props.game_key
    },
    
  })
})(GamesPoller);