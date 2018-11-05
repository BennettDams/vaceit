export default {
  enemies: state => {
    let enemies = [];
    if (state.matches.length > 0) {
      state.matches.forEach(match => {
        match.teams.teamEnemy.players.forEach(player => {
          enemies.push(player);
        });
      });
    }
    enemies = enemies.filter(
      (enemy, index, self) =>
        index === self.findIndex(e => e.playerId === enemy.playerId)
    );
    return enemies;
  },
  enemiesWithBans: (state, getters) => {
    let enemiesWithBans = [];
    enemiesWithBans = getters.enemies.filter(enemy => {
      return state.bans.some(ban => ban.playerId == enemy.playerId);
    });
    return enemiesWithBans;
  }
};
