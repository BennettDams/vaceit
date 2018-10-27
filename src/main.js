import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

const isProd = process.env.NODE_ENV == "production";

Vue.use(VueAnalytics, {
  id: "UA-119045626-2",
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
