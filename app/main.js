// CSS Imports
// –– Root Styles
import './main.css!'

// JS Imports
// –– Vue
import Vue from 'vue'
import router from './router'
import store from 'app/vuex/store'
import { window_size, user, is_admin } from 'app/vuex/getters'
import { sign_out } from 'app/vuex/actions'

import ResizeMixin from 'vue-resize-mixin'

import { control_url } from 'consts'


// –– Control
System.import(control_url).then(({Control}) => {  // eslint-disable-line no-undef
    Control.prototype.install = function(Vue) {
        Vue.prototype.$control = this
    }

    Vue.use(new Control())

    router.start({
        store,
        mixins: [ResizeMixin],
        ready() {
            // catch websocket broadcasts
            this.$control
                .init((signal, message) => store.dispatch(signal, message))
                .then(status => store.dispatch('WS_STATUS_SET', status))
                .catch(error => store.dispatch('WS_ERROR_SET', error))
        },
        vuex: {
            getters: {
                user,
                is_admin,
                window_size,
                auth_handshake_complete: state => state.auth_handshake_complete,
            },
            actions: {
                sign_out,
            },
        },
        events: {
            resize: size => store.dispatch({
                type: 'WINDOWS_SIZE_SET',
                silent: true,
                payload: size,
            }),
        },
    }, 'body')
})
