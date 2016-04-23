import './main.css!'

import router from './router'
import ResizeMixin from 'vue-resize-mixin'

import {ws_url} from '../consts'
import Control from './utils/control'


router.start({
    mixins: [ResizeMixin],
    data() {
        return {
            window_size: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
            control: null,
            ready: false,
            user: null,
        }
    },
    computed: {
        loaded() {
            return this.ready && this.control._handshake_complete
        },
    },
    created() {
        this.control = new Control(this, ws_url)
    },
    ready() {
        this.ready = true
    },
    methods: {
        sign_out() {
            this.control.send('sign_out', {}, this.signed_out)
        },
        signed_out() {
            this.user = null
            this.$broadcast('signed_out')
        },
    },
    events: {
        resize(new_size) {
            this.window_size = new_size
        },
    },
}, 'body')
