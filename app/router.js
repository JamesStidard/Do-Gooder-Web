import Vue from 'vue'
import VueRouter from 'vue-router'

import {debug} from 'consts'


Vue.use(VueRouter)
Vue.config.debug = debug

const router = new VueRouter({
    history: true,
})

router.map({
    // '/path': {
    //     name: 'Name',
    //     component: Compoent,
    //     props: ['something'],
    // },
})

export default router
