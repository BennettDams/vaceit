import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import BansAndEnemies from "./views/BansAndEnemies.vue";
import Matches from "./views/Matches.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/bans-and-enemies",
      name: "bans-and-enemies",
      component: BansAndEnemies
    },
    {
      path: "/matches",
      name: "matches",
      component: Matches
    }
  ]
});
