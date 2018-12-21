import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import BootstrapVue from 'bootstrap-vue'
import Snotify from 'vue-snotify'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Snotify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
