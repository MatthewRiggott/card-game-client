
export default class Storage {
  static GetGames = () => {
    const games = localStorage.games;
    if(games) {
      return JSON.parse(games);
    }
    return [];
  }

  static CurrentPlayer = () => {
    const currentPlayer = localStorage.currentPlayer;
    if(currentPlayer) {
      return JSON.parse(currentPlayer);
    }
    return undefined;
  }

  static SetPlayer = (player) => {
    const currentPlayer = Storage.CurrentPlayer();
    if(!currentPlayer) {
      const filteredPlayer = {
        id: player.id,
        name: player.name
      }
      localStorage.currentPlayer = JSON.stringify(player);
    }
  }

  static AddGame = (game, player_id) => {
    const games = Storage.GetGames();
    if (games.map(g => g.id).indexOf(game.id) === -1) {
      const newGame = { ...game, player_id }
      const updatedGames = games.concat(game);
      const data = JSON.stringify(updatedGames);
      localStorage.games = data;
    }
  }

  static RemoveGame = (id) => {
    const games = Storage.GetGames();
    if (games) {
      const filteredGames = games.filter(g => g.id !== id);
      const data = JSON.stringify(filteredGames);
      localStorage.games = data;
    }
  }
}

