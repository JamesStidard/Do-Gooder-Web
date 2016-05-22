import './admin.css!'
import tmpl from './admin.html!text'
import Vue from 'vue'

import { deeds } from 'app/vuex/getters'
import { get_deeds, insert_deed, delete_deed } from 'app/vuex/actions'

export default Vue.extend({
    template: tmpl,
    data: () => ({
        description:'',
    }),
    computed: {

    },
    ready() {
        this.get_deeds()
    },
    methods: {
        create_deed() {
            this.insert_deed(this.description)
                .then(() => (this.description = ''))
                .catch(error => (this.error = error.message))
        },
    },
    vuex: {
        getters: {
            deeds,
        },
        actions: {
            get_deeds,
            insert_deed,
            delete_deed,
        },
    },
})
