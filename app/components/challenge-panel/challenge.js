import './challenge.css!'
import tmpl from './challenge.html!text'
import Vue from 'vue'
import tz from 'jstimezonedetect'


export default Vue.extend({
    template: tmpl,
    props: [
        "control",
    ],
    data() {
        return {
            error: '',
            deeds: [],
        }
    },
    computed: {

    },
    ready() {
        this.get_deeds()
    },
    methods: {
        get_deeds() {
            this.error = ''
            this.deeds = []
            const timezone = tz.determine().name()
            this.control.send('get_todays_deeds', {timezone}, this.got_deeds)
        },
        got_deeds(request, response) {
            try {
                this.error = response.error
                this.deeds = response.result
            }
            catch(error) {
                this.error = "Couldn't parse server reponse."
            }
        },
        accomplish_deed(id) {
            this.error = ''
            this.control.send('accomplish_deed', {id}, this.accomplished_deed)
        },
        accomplished_deed(request, response) {
            this.error = response.error
        },
    },
    events: {
        update_deed(deed) {
            const index = this.deeds.findIndex(d => d.id === deed.id)
            if (index !== -1) this.deeds.$set(index, deed)
            return true
        },
        delete_deed(id) {
            // Did a challenge get deleted? Then replace them both
            const index = this.deeds.findIndex(d => d.id === id)
            if (index !== -1) this.get_deeds()
            return true
        },
    },
})
