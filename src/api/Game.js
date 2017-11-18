export default class Game {
  constructor(name) {
    this.name = name
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
      'body': JSON.stringify({ game }),
    })).json();
  }
}