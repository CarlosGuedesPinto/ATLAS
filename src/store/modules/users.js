const state = {
    users: []
}

const getters = {

}

const actions = {
    set(context, payload) {
        context.commit("SET", payload)
    }
}

const mutations = {
    SET(state, payload) {
        state.users = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
