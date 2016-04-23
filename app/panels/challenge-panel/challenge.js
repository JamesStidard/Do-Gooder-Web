import './challenge.css!'
import tmpl from './challenge.html!text'
import Vue from 'vue'
import PercentageWidget from 'app/components/percentage-widget/percentage-widget'
import tz from 'jstimezonedetect'


export default Vue.extend({
    template: tmpl,
    components: {
        'percentage-widget': PercentageWidget,
    },
    props: [
        "control",
    ],
    data() {
        return {
            error: '',
            deeds: [],
            hot_colors: {
                light: 'rgb(252, 145, 66)',
                medium: 'rgb(250, 125, 62)',
                heavy: 'rgb(244, 66, 55)',
            },
            cool_colors: {
                light: 'rgb(0, 172, 222)',
                medium: 'rgb(0, 149, 230)',
                heavy: 'rgb(0, 120, 184)',
            },
        }
    },
    computed: {
        accomplished_deed() {
            return this.deeds.some(d => d.accomplished)
        },
        total_champains() {
            return this.deeds.filter(d => d.accomplished_count)
                             .map(d => d.accomplished_count)
                             .reduce((a, b) => a + b, 0)
        },
        column_width() {
            return 100 / this.deeds.length + '%'
        },
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
        accomplish_deed(deed_id) {
            this.error = ''
            this.control.send('accomplish_deed', {deed_id}, this.got_deeds)
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
        percentage_of_champains(champains) {
            return 100 * champains / this.total_champains
        },
        primary_color(index) {
            return index % 2 ? this.hot_colors.light : this.cool_colors.light
        },
        secondary_color(index) {
            return index % 2 ? this.hot_colors.heavy : this.cool_colors.heavy
        },
        background(index) {
            return index % 2 ?
                'linear-gradient(180deg, ' + this.hot_colors.light + ' 70%, ' + this.hot_colors.medium + ' 30%)' :
                'linear-gradient(180deg, ' + this.cool_colors.light + ' 70%, ' + this.cool_colors.medium + ' 30%)'
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
