import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import format from "date-fns/format";
import addSeconds from "date-fns/add_seconds";

Vue.use(Vuex);

// function fixFaceitUrl(url) {
//   return url.replace("{lang}", "en");
// }

function dateFromUnix(value) {
  if (!value) return "";
  value = format(addSeconds(new Date(0), value), "YYYY-MM-DD hh:mm");
  return value;
}

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
});

export default new Vuex.Store({
  state: {
    player: {},
    matches: [],
    matchesId: 1,
    enemiesAll: []
  },
  getters: {
    enemies: state => {
      return state.enemiesAll.map((item, index) => ({
        id: index + 1,
        ...item
      }));
    },
    amountBannedEnemies: state => {
      let amountBans = 0;
      if (state.enemies) {
        state.enemies.forEach(enemy => {
          if (enemy.bans.length > 0) amountBans++;
        });
      }
      return amountBans;
    }
  },
  mutations: {
    UPDATE_USER: (state, payload) => {
      state.player = payload;
    },
    UPDATE_ENEMIES: (state, player) => {
      console.log("MUT: update enemiesAll");
      if (!state.enemiesAll.includes(player.player_id)) {
        state.enemiesAll.push(player);
      }
    },
    UPDATE_MATCHES: (state, matches) => {
      console.log("MUT: update matches");
      matches = matches.map(match => {
        let obj = {};
        obj.id = state.matchesId++;
        obj.matchId = match.matchId;
        // obj.faceitMatchUrl = fixFaceitUrl(match.faceit_url);
        obj.startedAt = dateFromUnix(match.created_at);
        obj.finishedAt = dateFromUnix(match.updated_at);
        obj.gameId = match.game;
        obj.gameMode = match.gameMode;
        // obj.competitionName = match.competition_name;
        obj.teams = {};
        obj.teams.teamOwn = {};
        obj.teams.teamOwn.players = [];
        obj.teams.teamEnemy = {};
        obj.teams.teamEnemy.players = [];
        obj.teamId = match.teamId;
        obj.map = match.i1;
        obj.score = match.i18;

        return obj;
      });
      state.matches.push(...matches);
    },
    UPDATE_MATCH_DETAILS: (state, payload) => {
      console.log("MUT: update match details");

      let index = state.matches
        .map(function(e) {
          return e.matchId;
        })
        .indexOf(payload.matchId);

      let match = state.matches[index];

      if (match.matchId == payload.matchId) {
        let ownTeam1 = false;
        let teamOwn = null;
        let teamEnemy = null;
        // let roster = null;

        // if (payload.matchDetails.teams.faction1["roster"]) {
        //   roster = "roster";
        // } else {
        //   roster = "roster_v1";
        // }

        // payload.matchDetails.teams.faction1[roster].forEach(player => {
        //   if (player.player_id == state.player.player_id) {
        //     ownTeam1 = true;
        //   }
        // });

        payload.matchDetails.faction1.forEach(player => {
          if (player.guid == state.player.player_id) {
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

        payload.matchDetails.teams[teamOwn].forEach(player => {
          match.teams.teamOwn.players.push({
            playerId: player.guid,
            nickname: player.nickname,
            avatar: player.avatar,
            steamId: player.csgo_id,
            steamName: player.steam_nickname,
            faceitLevel: player.csgo_skill_level_label
          });
        });

        payload.matchDetails.teams[teamEnemy].forEach(player => {
          match.teams.teamOwn.players.push({
            playerId: player.guid,
            nickname: player.nickname,
            avatar: player.avatar,
            steamId: player.csgo_id,
            steamName: player.steam_nickname,
            faceitLevel: player.csgo_skill_level_label
          });
        });

        match.teams.teamOwn.name = payload.matchDetails[teamOwn + "_nickname"];
        match.teams.teamEnemy.name =
          payload.matchDetails[teamEnemy + "_nickname"];

        match.gameMode2 = payload.matchDetails.match_type_label;

        match.startedAt2 = payload.matchDetails.startedAt.substring(0, 11);
      }

      state.matches[index] = match;
    }
  },
  actions: {
    fetchPlayerByAccountId: ({ commit }, accountId) => {
      console.log("ACT: fetching player by account id");
      let baseUrl = "https://api.faceit.com/core/v1/users";

      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
        }
      };

      let url = baseUrl + "/" + accountId;

      axios
        .get(url, config)
        .then(function(response) {
          commit("UPDATE_ENEMIES", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fetchUserByName: ({ commit }, nickname) => {
      console.log("ACT: fetching accountId by name");
      let baseUrl = "https://open.faceit.com/data/v4/players";

      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
        },
        params: {
          nickname: nickname,
          game: "csgo"
        }
      };

      let url = baseUrl;

      axios
        .get(url, config)
        .then(function(response) {
          commit("UPDATE_USER", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fetchMatches: ({ commit, state, dispatch }) => {
      console.log("ACT: fetching matches");
      let baseUrl = "https://api.faceit.com/stats/api/v1/stats/time/users";

      let url =
        baseUrl + "/" + state.player.player_id + "/games/csgo?size=1000";

      axios
        .get(`${"https://cors-anywhere.herokuapp.com/"}` + url)
        .then(function(response) {
          commit("UPDATE_MATCHES", response.data);
          if (response.data.length > 0) {
            state.matches.forEach(match => {
              if (match.id < 4) {
                dispatch("fetchMatchDetails", match.matchId);
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fetchMatchDetails: ({ commit }, matchId) => {
      console.log("ACT: fetching match details");
      // let baseUrl = "https://api.faceit.com/match/v1/match";
      let baseUrl = "https://api.faceit.com/core/v1/matches";

      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
        },
        params: {
          withStats: true
        },
        retry: 5,
        retryDelay: 3000
      };

      let url = baseUrl + "/" + matchId;

      axios
        // .get(`${"https://cors-anywhere.herokuapp.com/"}` + url, config)
        .get(url, config)
        .then(function(response) {
          commit("UPDATE_MATCH_DETAILS", {
            matchDetails: response.data.payload,
            matchId: matchId
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
