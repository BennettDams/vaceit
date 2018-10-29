import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import format from "date-fns/format";
import addSeconds from "date-fns/add_seconds";
// import getMatchDetails from "@/util/getMatchDetails.js";

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
    matchesRaw: []
  },
  getters: {
    matches: state => {
      let result = [];
      result = state.matchesRaw.map((item, index) => {
        let obj = {};

        obj = {
          id: index + 1,
          matchId: item["match_id"],
          startedAt: dateFromUnix(item["started_at"]),
          finishedAt: dateFromUnix(item["finished_at"]),
          competitionName: item["competition_name"],
          matchUrl: fixFaceitUrl(item["faceit_url"])
        };

        if (item["matchDetails"]) {
          obj["matchDetails"] = {
            score: item["matchDetails"]["round_stats"]["Score"],
            map: item["matchDetails"]["round_stats"]["Map"]
          };

          let ownTeam1 = null;
          let teamNumberOwn = null;
          let teamNumberEnemy = null;
          item["matchDetails"]["teams"][0]["players"].forEach(e => {
            if (e.player_id == state.player.player_id) {
              ownTeam1 = true;
            }
          });

          if (ownTeam1) {
            teamNumberOwn = 1;
            teamNumberEnemy = 2;
          } else {
            teamNumberOwn = 2;
            teamNumberEnemy = 1;
          }

          obj["matchDetails"]["teams"] = {
            teamOwn: {
              teamId:
                item["matchDetails"]["teams"][teamNumberOwn - 1]["team_id"],
              winner:
                item["matchDetails"]["teams"][teamNumberOwn - 1]["team_stats"][
                  "Team Win"
                ] == "1"
                  ? true
                  : false,
              name:
                item["matchDetails"]["teams"][teamNumberOwn - 1]["team_stats"][
                  "Team"
                ],
              players:
                item["matchDetails"]["teams"][teamNumberOwn - 1]["players"],
              premade:
                item["matchDetails"]["teams"][teamNumberOwn - 1]["premade"],
              finalScore:
                item["matchDetails"]["teams"][teamNumberOwn - 1]["team_stats"][
                  "Final Score"
                ]
            },
            teamEnemy: {
              teamId:
                item["matchDetails"]["teams"][teamNumberEnemy - 1]["team_id"],
              winner:
                item["matchDetails"]["teams"][teamNumberOwn - 1]["team_stats"][
                  "Team Win"
                ] == "1"
                  ? true
                  : false,
              name:
                item["matchDetails"]["teams"][teamNumberEnemy - 1][
                  "team_stats"
                ]["Team"],
              players:
                item["matchDetails"]["teams"][teamNumberEnemy - 1]["players"],
              premade:
                item["matchDetails"]["teams"][teamNumberEnemy - 1]["premade"],
              finalScore:
                item["matchDetails"]["teams"][teamNumberEnemy - 1][
                  "team_stats"
                ]["Final Score"]
            }
          };
        }
        return obj;
      });
      return result;
    },
    enemies: (state, getters) => {
      return getters.matches.map((item, index) => ({
        id: index + 1,
        ...item
      }));
    }
  },
  mutations: {
    UPDATE_PLAYER: (state, payload) => {
      state.player = payload;
    },
    UPDATE_MATCHES_RAW: (state, payload) => {
      console.log("MUT: update matches raw");
      state.matchesRaw = payload;
    },
    UPDATE_MATCH_DETAILS: (state, payload) => {
      console.log("MUT: update match details");
      state.matchesRaw = state.matchesRaw.map(e => {
        if (e.match_id == payload.matchId) {
          e["matchDetails"] = payload.matchDetails;
        }
        return e;
      });
    }
  },
  actions: {
    fetchAccountIdByName: ({ commit }, payload) => {
      console.log("ACT: fetching accountId by name");
      let baseUrl = "https://open.faceit.com/data/v4/players";

      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
        },
        params: {
          nickname: payload,
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
    fetchMatches: ({ commit, state, dispatch, getters }) => {
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
          commit("UPDATE_MATCHES_RAW", response.data.items);
          getters.matches.forEach(e => {
            dispatch("fetchMatchDetails", e.matchId);
          });
          // dispatch("fetchMatchDetails");
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
      let url = baseUrl + matchId + "/stats";
      axios
        .get(url, config)
        .then(function(response) {
          commit("UPDATE_MATCH_DETAILS", {
            matchDetails: response.data.rounds[0],
            matchId: matchId
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    // fetchMatchDetails: ({ commit, state }) => {
    //   console.log("ACT: fetching match details");
    //   let baseUrl = "https://open.faceit.com/data/v4/matches/";

    //   let config = {
    //     headers: {
    //       accept: "application/json",
    //       Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
    //     },
    //     retry: 8,
    //     retryDelay: 2000
    //   };
    //   state.matchesRaw.forEach(e => {
    //     let url = baseUrl + e["match_id"] + "/stats";
    //     axios
    //       .get(url, config)
    //       .then(function(response) {
    //         commit("UPDATE_MATCH_DETAILS", {
    //           matchDetails: response.data.rounds[0],
    //           matchId: e["match_id"]
    //         });
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   });
    // },
  }
});
