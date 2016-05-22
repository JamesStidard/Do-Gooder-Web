import Vue from 'vue'
import Vuex from 'vuex'

import { debug } from 'consts'

Vue.use(Vuex)


const state = {
    window_size: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    ws_status: null,
    error: null,
    user: null,
    todays_deeds: [],
    deeds: [],
    accomplishments: [],
}


const mutations = {
    WINDOWS_SIZE_SET(state, size) {
        state.window_size = size
    },
    WS_STATUS_SET(state, status) {
        state.ws_status = status
    },
    WS_ERROR_SET(stete, error) {
        state.ws_status = 'closed'
        console.log(error)
    },
    ERROR_SET(state, error) {
        state.error = error
    },
    CURRENT_USER_SET(state, user) {
        state.user = user
    },
    MICRO_COOKIE_SET(state, cookie) {
        console.log(cookie)
    },
    TODAYS_DEEDS_SET(state, deeds) {
        state.todays_deeds = deeds
    },
    DEEDS_SET(state, deeds) {
        state.deeds = deeds
    },
    DEED_INSERT(state, deed) {
        state.deeds.push(deed)
    },
    DEED_UPDATE(state, deed) {
        const index = state.deeds.findIndex(d => d.id === deed.id)
        if (index !== -1) state.deeds.$set(index, deed)
    },
    DEED_DELETE(state, deed_id) {
        const index = state.deeds.findIndex(d => d.id === deed_id)
        if (index !== -1) state.deeds.splice(index, 1)
    },
}


export default new Vuex.Store({
    state,
    mutations,
    strict: debug,
})
