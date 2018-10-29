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

export default new Vuex.Store({
  state: {
    player: {},
    drawer: true,
    matchesRaw: []
  },
  getters: {
    matches: state => {
      let result = [];
      result = state.matchesRaw.map((item, index) => ({
        id: index + 1,
        matchId: item["match_id"],
        matchDetails: item["matchDetails"],
        startedAt: dateFromUnix(item["started_at"]),
        finishedAt: dateFromUnix(item["finished_at"]),
        competitionName: item["competition_name"],
        teams: {
          team1: item["teams"]["faction1"],
          team2: item["teams"]["faction2"]
        },
        matchUrl: fixFaceitUrl(item["faceit_url"])
      }));
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
    },
    UPDATE_DRAWER(state) {
      console.log("draw");

      state.drawer = !state.drawer;
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
          commit("UPDATE_MATCHES_RAW", response.data.items);
          dispatch("fetchMatchDetails");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fetchMatchDetails: ({ commit, state }) => {
      console.log("ACT: fetching match details");
      let baseUrl = "https://open.faceit.com/data/v4/matches/";

      let config = {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
        }
      };

      state.matchesRaw.forEach(e => {
        let url = baseUrl + e["match_id"];
        axios
          .get(url, config)
          .then(function(response) {
            commit("UPDATE_MATCH_DETAILS", {
              matchDetails: response.data,
              matchId: e["match_id"]
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    toggleDrawer({ commit }) {
      commit("UPDATE_DRAWER");
    }
  }
});
