import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import format from "date-fns/format";
import addSeconds from "date-fns/add_seconds";

Vue.use(Vuex);

function fixFaceitUrl(url) {
  return url.replace("{lang}", "en");
}

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
    matches: []
  },
  getters: {
    // enemies: (state, getters) => {
    //   return getters.matches.map((item, index) => ({
    //     id: index + 1,
    //     ...item
    //   }));
    // }
  },
  mutations: {
    UPDATE_PLAYER: (state, payload) => {
      state.player = payload;
    },
    UPDATE_MATCHES: (state, matches) => {
      console.log("MUT: update matches");
      matches = matches.map((match, index) => {
        let obj = {};
        obj.id = index + 1;
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

        return obj;
      });
      state.matches = matches;
    },
    UPDATE_MATCH_DETAILS: (state, payload) => {
      console.log("MUT: update match details");
      let matches = state.matches;
      matches = matches.map(match => {
        if (match.matchId == payload.matchId) {
          let ownTeam1 = false;
          let teamOwn = null;
          let teamEnemy = null;
          let roster = null;

          if (payload.matchDetails.teams.faction1["roster"]) {
            roster = "roster";
          } else {
            roster = "roster_v1";
          }

          payload.matchDetails.teams.faction1[roster].forEach(player => {
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

          payload.matchDetails.teams[teamOwn][roster].forEach(player => {
            match.teams.teamOwn.players.push({
              playerId: player.player_id,
              nickname: player.nickname,
              avatar: player.avatar,
              steamId: player.game_player_id,
              steamName: player.game_player_name,
              faceitLevel: player.game_skill_level
            });
          });

          payload.matchDetails.teams[teamEnemy][roster].forEach(player => {
            match.teams.teamEnemy.players.push({
              playerId: player.player_id,
              nickname: player.nickname,
              avatar: player.avatar,
              steamId: player.game_player_id,
              steamName: player.game_player_name,
              faceitLevel: player.game_skill_level
            });
          });

          match.teams.teamOwn.name = payload.matchDetails.teams[teamOwn].name;
          match.teams.teamEnemy.name =
            payload.matchDetails.teams[teamEnemy].name;

          if (Array.isArray(payload.matchDetails.voting)) {
            match.map = payload.matchDetails.voting[0].map.name;
          } else {
            match.map = payload.matchDetails.voting.map.pick[0];
          }
          match.map = match.map.replace(/"/, "");
        }
        return match;
      });
      state.matches = matches;
    }
  },
  actions: {
    fetchAccountIdByName: ({ commit }, nickname) => {
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
          commit("UPDATE_PLAYER", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // fetchMatches: ({ commit, state, dispatch, getters }) => {
    fetchMatches: ({ commit, state, dispatch }) => {
      console.log("ACT: fetching matches");
      let baseUrl = "https://open.faceit.com/data/v4/players";

      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
        },
        params: {
          from: 1293840000,
          game: "csgo",
          offset: 0,
          limit: 100
        }
      };

      let url = baseUrl + "/" + state.player.player_id + "/history";

      axios
        .get(url, config)
        .then(function(response) {
          commit("UPDATE_MATCHES", response.data.items);
          state.matches.forEach(match => {
            setTimeout(function() {
              dispatch("fetchMatchDetails", match.matchId);
            }, 1000);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fetchMatchDetails: ({ commit }, matchId) => {
      console.log("ACT: fetching match details");
      let baseUrl = "https://open.faceit.com/data/v4/matches/";

      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
        },
        retry: 8,
        retryDelay: 1000
      };
      // let url = baseUrl + matchId + "/stats";
      let url = baseUrl + matchId;
      axios
        .get(url, config)
        .then(function(response) {
          commit("UPDATE_MATCH_DETAILS", {
            // matchDetails: response.data.rounds[0],
            matchDetails: response.data,
            matchId: matchId
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
