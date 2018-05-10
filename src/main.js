import Vue from 'vue'
import App from './App.vue'
import router from './router'

import jQuery from 'jquery'
global.jQuery = jQuery

import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '../node_modules/materialize-css/dist/js/materialize.min.js'

Vue.use(VeeValidate)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
