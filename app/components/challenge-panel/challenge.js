import './challenge.css!'
import tmpl from './challenge.html!text'
import Vue from 'vue'
import timezone from 'jstimezonedetect'


const TODAYS_DEEDS = {
    limit: 2,
    timezone: timezone.determine().name(),
}


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
            this.deeds = []
            this.control.send('get_deeds', TODAYS_DEEDS, this.got_deeds)
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
