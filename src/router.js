import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Banchecker from './components/Banchecker.vue'
import Matches from './components/Matches.vue'
import Bans from './components/Bans.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bans',
      name: 'bans',
      component: Bans
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches
    },
    {
      path: '/banchecker',
      name: 'banchecker',
      component: Banchecker
    },
    {
      // ":name" is the param
      // path: '/about/:name',
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
