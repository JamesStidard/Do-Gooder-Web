import Vue from 'vue'
import VueRouter from 'vue-router'

import {debug} from '../consts'

import ChallengePanel from './components/challenge-panel/challenge'
import AdminPanel from './components/admin-panel/admin'


Vue.use(VueRouter)
Vue.config.debug = debug

const router = new VueRouter({
    history: false,
})

router.map({
    '/': {
        name: 'challenge',
        component: ChallengePanel,
        props: ['control'],
    },
    '/admin': {
        name: 'admin',
        component: AdminPanel,
        props: ['control'],
    },
})

export default router
