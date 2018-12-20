import Vue from 'vue'
import Vuex from 'vuex'
//import users from './modules/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    loggedUserId: -1,
    institutions: []
  },
  getters: {
    getUserById: state => id => {
      return state.users.find(user => user.id === id)
    },
    getUserByUsername: state => username => {
      return state.users.find(user => user.username.toLowerCase() === username.toLowerCase())
    },
    getUserByEmail: state => email => {
      return state.users.find(user => user.email.toLowerCase() === email.toLowerCase())
    },
    getLoggedUserId: state => state.loggedUserId,
    getLastUserId: state => {
      let lastId = 0
      if (state.users.length) {
        state.users.forEach(user => {
          if (user.id >= lastId) {
            lastId = user.id
          }
        })
      }
      return lastId
    },
    getInstitutions: state => {
      return state.institutions
    }
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
    CREATED_ACCOUNT(state, payload) {
      state.users.push(payload)
    },
    SET_INSTITUTIONS(state, payload) {
      state.institutions = payload
    }
  },
  actions: {
    setUsers(context, payload) {
      context.commit("SET_USERS", payload)
    },
    setInstitutions(context, payload) {
      context.commit("SET_INSTITUTIONS", payload)
    },
    userLoggedIn(context, payload) {
      context.commit("USER_LOGGED_IN", payload)
    },
    userLoggedOut(context, payload) {
      context.commit("USER_LOGGED_OUT", payload)
    },
    createdAccount(context, payload) {
      context.commit("CREATED_ACCOUNT", payload)
    }
  }
})