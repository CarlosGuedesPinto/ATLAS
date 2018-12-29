import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import BootstrapVue from 'bootstrap-vue'
import Snotify from 'vue-snotify'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Snotify)
Vue.use(Vuesax)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
