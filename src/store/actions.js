import axios from "axios";

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // if config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // check if total number of retries is maxed out
  if (config.__retryCount >= config.retry) {
    // reject with the error
    return Promise.reject(err);
  }

  // increase the retry count
  config.__retryCount += 1;

  // create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  // return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
});

export default {
  fetchAccountIdByName: ({ commit, dispatch }, nickname) => {
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
        dispatch("fetchMatches", 0);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  fetchEnemyDetailsById: ({ commit, getters }) => {
    console.log("ACT: fetching enemy details by id");
    let baseUrl = "https://open.faceit.com/data/v4/players";

    let config = {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
      },
      retry: 12,
      retryDelay: 2000
    };

    getters.enemies.forEach(enemy => {
      let url = baseUrl + "/" + enemy.playerId;

      axios
        .get(url, config)
        .then(function(response) {
          commit("TEST", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  },
  fetchMatches: ({ commit, state, dispatch }, offset) => {
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
        offset: offset,
        limit: 100
      }
    };

    let url = baseUrl + "/" + state.user.player_id + "/history";

    axios
      .get(url, config)
      .then(function(response) {
        if (response.data.items.length > 0) {
          commit("UPDATE_MATCHES", response.data.items);
          // dispatch("fetchMatches", offset + 100);
          dispatch("fetchMatchDetails", 0);
        }
        // } else {
        //   dispatch("fetchEnemyDetailsById");
        // }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  fetchBans: ({ commit, dispatch }) => {
    console.log("ACT: fetching bans");
    let baseUrl =
      "https://cors-anywhere.herokuapp.com/https://vaceit-backend.herokuapp.com/bans";

    let url = baseUrl;

    axios
      .get(url)
      .then(function(response) {
        dispatch("setIsFetchingBans", true);
        if (response.data.length > 0) {
          commit("UPDATE_BANS", response.data);
        } else {
          dispatch("setIsFetchingBans", false);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  // fetchBans: ({ commit, dispatch }, offset) => {
  //   console.log("ACT: fetching bans");
  //   let baseUrl = "https://api.faceit.com/core/v1/bans";

  //   let config = {
  //     // headers: {
  //     //   accept: "application/json",
  //     //   Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
  //     // },
  //     params: {
  //       limit: 100,
  //       offset: offset
  //     }
  //   };

  //   let url = baseUrl;

  //   axios
  //     .get(url, config)
  //     .then(function(response) {
  //       dispatch("setIsFetchingBans", true);
  //       if (
  //         response.data &&
  //         response.data.payload &&
  //         response.data.payload.length > 0
  //       ) {
  //         commit("UPDATE_BANS", response.data.payload);
  //         dispatch("fetchBans", offset + 100);
  //       } else {
  //         dispatch("setIsFetchingBans", false);
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // },
  fetchMatchDetails: ({ commit, dispatch, state }) => {
    console.log("ACT: fetching match details");
    let offset = state.matchDetailsOffset;
    let matchesToFetch = state.matches.slice(offset, offset + 100);
    matchesToFetch.forEach(match => {
      dispatch("fetchMatchDetailsById", match.matchId);
      commit("UPDATE_MATCH_DETAILS_OFFSET", offset);
    });
  },
  fetchMatchDetailsById: ({ commit }, matchId) => {
    console.log("ACT: fetching match details by id");
    // let baseUrl = "https://open.faceit.com/data/v4/matches/";
    let baseUrl = "https://open.faceit.com/data/v4/matches";

    let config = {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
      },
      retry: 5,
      retryDelay: 1000
    };

    let url = baseUrl + "/" + matchId + "/stats";

    axios
      .get(url, config)
      .then(function(response) {
        commit("UPDATE_MATCH_DETAILS", {
          matchDetails: response.data.rounds[0],
          // matchDetails: response.data,
          matchId: matchId
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  setIsFetchingBans: ({ commit }, status) => {
    commit("UPDATE_IS_FETCHING_BANS", status);
  }
};
