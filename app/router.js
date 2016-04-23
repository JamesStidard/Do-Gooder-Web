import Vue from 'vue'
import VueRouter from 'vue-router'

import {debug} from '../consts'

import SignInPanel from './panels/sign-in-panel/sign-in'
import ChallengePanel from './panels/challenge-panel/challenge'
import AdminPanel from './panels/admin-panel/admin'


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
    '/sign-in': {
        name: 'sign-in',
        component: SignInPanel,
        props: ['control', 'user'],
    },
})

export default router
