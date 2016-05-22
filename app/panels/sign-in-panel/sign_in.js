import './sign_in.css!'
import tmpl from './sign_in.html!text'
import Vue from 'vue'

import { user } from 'app/vuex/getters'
import { sign_in } from '/app/vuex/actions'


export default Vue.extend({
    template: tmpl,
    data: () => ({
        credentials: {
            email: '',
            password: '',
        },
    }),
    vuex: {
        getters: {
            user,
        },
        actions: {
            sign_in,
        },
    },
    watch: {
        user() {
            this.$router.go('/')
        },
    },
})
