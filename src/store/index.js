import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import format from "date-fns/format";
import addSeconds from "date-fns/add_seconds";
// import addMatchInfo from "@/util/addMatchInfo.js";

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
      // let result = addMatchInfo(state.matchesRaw);
      result = state.matchesRaw.map((item, index) => ({
        id: index + 1,
        startedAt: dateFromUnix(item["started_at"]),
        competitionName: item["competition_name"],
        teams: {
          team1: item["teams"]["faction1"],
          team2: item["teams"]["faction2"]
        },
        matchId: item["match_id"],
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
    UPDATE_DRAWER(state) {
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
    fetchMatches: ({ commit, state }) => {
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
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toggleDrawer({ commit }) {
      commit("UPDATE_DRAWER");
    }
  }
});
