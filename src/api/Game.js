import Storage from './Storage';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default class GameGQL { 
  
  static lobbyListing = gql`
    query games {
      games {
        id
        players_count
        status
        name
      }
    }
  `;

  static createPlayer = gql `
    mutation createPlayer($playerName: String!) {
      createPlayer(name: $playerName) {
          id
          name
      }
    }
  `;

  static createGame = gql `
    mutation createGame($gameName: String!) {
      createGame(name: $gameName) {
        game {
          id
          name
          players_count
          status
          current_state
        }
        player_id
      }
    }
  `;

  static joinGame = gql `	
    mutation joinGame($gameId: String!) {
      joinGame(id: $gameId) {
        player_id
        game {
          id
          name
          players_count
          current_state
        }
      }
    }
  `;

  static leaveGame = gql `
    mutation leaveGame($gameId: String!, $playerId: String!) {
      leaveGame(game_id: $gameId, player_id: $player_id)
    }
  `

  static pollGame = gql `
    query pollGame($gameId: String!, $gameState: String!, $playerId: String!) {
      gamePollState(game_id: $gameId, last_state: $gameState, player_id: $playerId) {
        status_changed
        game {
          id
          name
          game_data
          current_state
          players_count
          status
        }
      }
    }
  `

  static loadGame = gql `
    query loadGame($gameId: String!, $playerId: String!) {
      loadGame(game_id: $gameId, player_id: $player_id) {
        game {
          current_state
          data
          players_count
          status
        }
      }
    }
  `
}