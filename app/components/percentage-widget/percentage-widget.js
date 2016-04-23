import tmpl from './percentage-widget.html!text'
import Vue from 'vue'


export default Vue.extend({
    template: tmpl,
    props: {
        percentage: {
            type: Number,
            required: true,
        },
        circle_size: {
            type: Number,
            default: 100,
        },
        primary_colour: {
            default: 'white',
        },
        secondary_colour: {
            default: 'black',
        },
        transition_speed: {
            default: 1,
        },
    },
    computed: {
        radial_progress_style() {
            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'border-radius': '50%',
                'background-color': this.secondary_colour,
            }
        },
        mask_fill_style() {
            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'position': 'absolute',
                'border-radius': '50%',
                'transition': 'transform ' + this.transition_speed + 's',
                'backface-visibility': 'hidden', // prevent Chrome aliasing on transform transition
            }
        },
        mask_style() {
            return {
                'clip': 'rect(0px, ' + this.circle_size + 'px, ' + this.circle_size + 'px, ' + this.circle_size / 2 + 'px)',
            }
        },
        rotation() {
            return {
                'transform': 'rotate(' + this.percentage * 1.8 + 'deg)',
            }
        },
        fix_rotation() {
            return {
                'transform': 'rotate(' + this.percentage * 3.6 + 'deg)',
            }
        },
        fill_style() {
            return {
                'background-color': this.primary_colour,
                'clip': 'rect(0px, ' + this.circle_size/2 + 'px, ' + this.circle_size + 'px, 0px)',
            }
        },
    },
})
