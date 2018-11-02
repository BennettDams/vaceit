import format from "date-fns/format";
import addSeconds from "date-fns/add_seconds";

function fixFaceitUrl(url) {
  return url.replace("{lang}", "en");
}

function dateFromUnix(value) {
  if (!value) return "";
  value = format(addSeconds(new Date(0), value), "YYYY-MM-DD hh:mm");
  return value;
}

// export const mutations = {
export default {
  UPDATE_PLAYER: (state, payload) => {
    state.player = payload;
  },
  UPDATE_MATCHES: (state, matches) => {
    console.log("MUT: update matches");
    let matchesTemp = matches.map(match => {
      let obj = {};
      obj.id = state.matchesId++;
      obj.matchId = match.match_id;
      obj.faceitMatchUrl = fixFaceitUrl(match.faceit_url);
      obj.startedAt = dateFromUnix(match.started_at);
      obj.finishedAt = dateFromUnix(match.finished_at);
      obj.gameId = match.game_id;
      obj.gameMode = match.game_mode;
      obj.competitionName = match.competition_name;
      obj.teams = {};
      obj.teams.teamOwn = {};
      obj.teams.teamOwn.players = [];
      obj.teams.teamEnemy = {};
      obj.teams.teamEnemy.players = [];

      let ownTeam1 = false;
      let teamOwn = null;
      let teamEnemy = null;

      match.teams.faction1.players.forEach(player => {
        if (player.player_id == state.player.player_id) {
          ownTeam1 = true;
        }
      });

      if (ownTeam1) {
        teamOwn = "faction1";
        teamEnemy = "faction2";
      } else {
        teamOwn = "faction2";
        teamEnemy = "faction1";
      }

      match.teams[teamOwn].players.forEach(player => {
        obj.teams.teamOwn.players.push({
          playerId: player.player_id,
          nickname: player.nickname,
          avatar: player.avatar,
          steamId: player.game_player_id,
          steamName: player.game_player_name,
          faceitLevel: player.game_skill_level,
          faceitAccountUrl: fixFaceitUrl(player.faceit_url)
        });
      });

      match.teams[teamEnemy].players.forEach(player => {
        obj.teams.teamEnemy.players.push({
          playerId: player.player_id,
          nickname: player.nickname,
          avatar: player.avatar,
          steamId: player.game_player_id,
          steamName: player.game_player_name,
          faceitLevel: player.game_skill_level,
          faceitAccountUrl: fixFaceitUrl(player.faceit_url)
        });
      });

      obj.teams.teamOwn.name = match.teams[teamOwn].nickname;
      obj.teams.teamEnemy.name = match.teams[teamEnemy].nickname;

      return obj;
    });
    state.matches.push(...matchesTemp);
  },
  UPDATE_MATCH_DETAILS: (state, payload) => {
    console.log("MUT: update match details");
    let matches = state.matches;
    matches = matches.map(match => {
      if (match.matchId == payload.matchId) {
        match.test = "test";
      }
      return match;
    });
    state.matches = matches;
  }
};
