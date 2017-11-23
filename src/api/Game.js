export default class Game {
  constructor(options) {
    this.name = options.name
    this.id = options.id || "new_game"
    this.player_id = options.player_id
  }

  static findAll = async () => {
    return await (await fetch("http://localhost:3000/games", {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      'method': 'get'
    })).json();
  }

  create = async () => {
    const game = this;
    return await (await fetch("http://localhost:3000/games", {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      'method': 'post',
      'body': JSON.stringify({ 
        message: {
          game_action: 'create',
          player_id: 'new',
          input: this.name,
        },
      }),
    })).json();
  }

  join = async () => {
    const game = this;
    return await (await fetch(`http://localhost:3000/games/${game.id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      'method': 'put',
      'body': JSON.stringify({
        message: {
          player_id: 'new_player',
          game_action: 'join'
        }
      }),
    })).json();
  }
}