import Vue from "vue";
import Vuex from "vuex";
import addMatchInfo from "@/util/addMatchInfo.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: {},
    drawer: true,
    matchesRaw: [],
    matches: []
  },
  mutations: {
    UPDATE_PLAYER: (state, payload) => {
      state.player = payload;
    },
    UPDATE_MATCHES_RAW: (state, payload) => {
      state.matchesRaw = payload;
    },
    UPDATE_MATCHES: (state, payload) => {
      state.matches = payload;
    },
    UPDATE_MATCH_INFORMATION: state => {
      addMatchInfo(state.matches);
    },
    UPDATE_DRAWER(state) {
      state.drawer = !state.drawer;
    }
  },
  actions: {
    setPlayer: (context, payload) => {
      context.commit("UPDATE_PLAYER", payload);
    },
    setMatchesRaw: (context, payload) => {
      context.commit("UPDATE_MATCHES_RAW", payload);
      context.commit("UPDATE_MATCHES", payload);
    },
    getMatchInformation: context => {
      context.commit("UPDATE_MATCH_INFORMATION");
    },
    toggleDrawer({ commit }) {
      commit("UPDATE_DRAWER");
    }
  }
});
