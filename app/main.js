import './main.css!'

import router from './router'

import {ws_url} from '../consts'
import Control from './utils/control'

import ChallengePanel from './components/challenge-panel/challenge'


router.start({
    components: {
        'challenge-panel': ChallengePanel,
    },
    data() {
        return {
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

    },
}, 'body')