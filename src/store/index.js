import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: {},
    drawer: true
  },
  mutations: {
    UPDATE_PLAYER: (state, payload) => {
      state.player = payload;
    },
    UPDATE_DRAWER(state) {
      state.drawer = !state.drawer;
    }
  },
  actions: {
    setPlayer: (context, payload) => {
      context.commit("UPDATE_PLAYER", payload);
    },
    toggleDrawer({ commit }) {
      commit("UPDATE_DRAWER");
    }
  }
});
