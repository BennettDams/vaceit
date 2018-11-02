import axios from "axios";

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

export default {
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

    let url = baseUrl + "/" + state.player.player_id + "/history";

    axios
      .get(url, config)
      .then(function(response) {
        if (response.data.items.length > 0) {
          commit("UPDATE_MATCHES", response.data.items);
          dispatch("fetchMatches", offset + 100);
        }
      })
      // .then(function(response) {
      //   if (response.data.items.length > 0) {
      //     commit("UPDATE_MATCHES", response.data.items);
      //     dispatch("fetchMatches", offset + 100);
      //   } else if (response.data.items.length == 0) {
      //     state.matches.forEach(match => {
      //       // setTimeout(function() {
      //       //   dispatch("fetchMatchDetails", match.matchId);
      //       // }, 1000);
      //       dispatch("fetchMatchDetails", match.matchId);
      //     });
      //   }
      // })
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
      retry: 4,
      retryDelay: 2000
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
};
