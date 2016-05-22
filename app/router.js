// JS Imports
import Vue from 'vue'
import VueRouter from 'vue-router'

import {debug} from 'consts'

// -- Route Panels
import SignInPanel from "app/panels/sign-in-panel/sign_in"
import AdminPanel from "app/panels/admin-panel/admin"
import ChallengePanel from "app/panels/challenge-panel/challenge"


Vue.use(VueRouter)
Vue.config.debug = debug

const router = new VueRouter({
    history: false,
})

router.map({
    '/': {
        name: "Today's Challenge",
        component: ChallengePanel,
    },
    '/sign-in': {
        name: 'Sign In',
        component: SignInPanel,
    },
    '/admin': {
        name: 'Admin',
        component: AdminPanel,
    },
})

// For debugging against the web console
if (debug) {
    window.app = router
}

export default router
