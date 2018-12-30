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
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#00225B',
      success: 'rgb(23, 201, 100)',
      danger: 'rgb(242, 19, 93)',
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
