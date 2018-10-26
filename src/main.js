import Vue from "vue";
import Vuetify from "vuetify";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: "#ff5722",
    secondary: "#ffa726",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#81c784",
    warning: "#00bcd4"
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
