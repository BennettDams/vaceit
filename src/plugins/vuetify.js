import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
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
