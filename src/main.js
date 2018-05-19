import Vue from 'vue'
import App from './App.vue'
import router from './router'

import jQuery from 'jquery'
global.jQuery = jQuery

import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueAxios from 'vue-axios'

import moment from 'moment'

import M from 'materialize-css'

// event bus pattern to share data between all components
// export const EventBus = new Vue();

export const store = new Vue({
  data: {
    accountId: '',
    accountName: ''
  }
})

Vue.use(VeeValidate)
Vue.use(VueAxios, axios)

Vue.use(moment)
Vue.use(M)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
