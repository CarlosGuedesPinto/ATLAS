import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import BootstrapVue from 'bootstrap-vue'
import Snotify from 'vue-snotify'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'
import axios from 'axios'

const http = axios.create({
  baseURL: "https://api.atlasapp.xyz",
});

Vue.prototype.$http = http

const moment = require("moment")
require("moment/locale/pt")

Vue.use(require("vue-moment"), {
    moment
})
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Snotify)
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#00225B',
      success: 'rgb(23, 201, 100)',
      danger: '#DC3545',
      warning: 'rgb(255, 130, 0)',
      dark: '#008FC1'
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
