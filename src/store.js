import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true
  },
  mutations: {
    UPDATE_DRAWER(state) {
      state.drawer = !state.drawer;
    }
  },
  actions: {
    toggleDrawer({ commit }) {
      commit("UPDATE_DRAWER");
    }
  }
});
