import Vue from 'vue'
import Vuex from 'vuex'
//import users from './modules/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    loggedUserId: -1
  },
  getters: {
    getUserByUsername: state => username => {
      return state.users.find(user => user.username.toLowerCase() === username.toLowerCase())
    },
    getUserById: state => id => {
      return state.users.find(user => user.id === id)
    },
    getLoggedUserId: state => state.loggedUserId,
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload
    },
    USER_LOGGED_IN(state, payload) {
      state.loggedUserId = payload
    },
    USER_LOGGED_OUT(state) {
      state.loggedUserId = -1
    },
  },
  actions: {
    setUsers(context, payload) {
      context.commit("SET_USERS", payload)
    },
    userLoggedIn(context, payload) {
      context.commit("USER_LOGGED_IN", payload)
    },
    userLoggedOut(context, payload) {
      context.commit("USER_LOGGED_OUT", payload)
    }
  }
})