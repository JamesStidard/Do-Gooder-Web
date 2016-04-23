import './sign-in.css!'
import tmpl from './sign-in.html!text'
import Vue from 'vue'


export default Vue.extend({
    template: tmpl,
    props: [
        'control',
    ],
    data() {
        return {
            error: '',
            credentials: {
                email: '',
                password: '',
            },
            signing_in: false,
        }
    },
    methods: {
        sign_in() {
            this.signing_in = true
            this.control.send('sign_in', this.credentials, this.signed_in)
        },
        signed_in(request, response) {
            this.signing_in = false
            this.error      = response.error
            if (!this.error) this.$router.go('/')
        },
    },
    computed: {
        disabled() {
            return !this.credentials.email
                || !this.credentials.password
                || this.signing_in
        },
        sign_in_text() {
            return (this.signing_in) ? 'Signing In' : 'Sign In'
        },
    },
})
