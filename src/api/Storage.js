
export default class Storage {

  static GetGames = () => {
    const games = localStorage.games;
    if(games) {
      return JSON.parse(games);
    }
    return [];
  }

  static AddGame = (game) => {
    const games = Storage.GetGames();
    if (games.map(g => g.id).indexOf(game.id) === -1) {
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

