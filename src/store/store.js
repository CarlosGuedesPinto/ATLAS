import Vue from 'vue'
import Vuex from 'vuex'
//import users from './modules/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    userByUsername: state => username => {
      return state.users.find(user => user.username.toLowerCase() === username.toLowerCase())
    }
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload
    }
  },
  actions: {
    setUsers(context, payload) {
      context.commit("SET_USERS", payload)
    }
  }
})