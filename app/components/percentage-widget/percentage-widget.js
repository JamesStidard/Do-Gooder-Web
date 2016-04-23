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
        primary_color: {
            default: 'white',
        },
        secondary_color: {
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
                'background-color': this.secondary_color,
            }
        },
        circle_style() {
            return {

            }
        },
        mask_style_left() {
            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'position': 'absolute',
                'border-radius': '50%',
                'background-color': this.secondary_color,
                'clip': 'rect(0px, ' + this.circle_size + 'px, ' + this.circle_size + 'px, ' + this.circle_size / 2 + 'px)',
                'backface-visibility': 'hidden', // prevent Chrome aliasing on transform transition
            }
        },
        mask_style_right() {
            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'position': 'absolute',
                'border-radius': '50%',
                'background-color': this.secondary_color,
                'clip': 'rect(0px, ' + this.circle_size / 2 + 'px, ' + this.circle_size + 'px, ' + '0px)',
                'backface-visibility': 'hidden', // prevent Chrome aliasing on transform transition
            }
        },
        fill_style_left() {
            // Max fill to 180 deg
            const fill = Math.min(3.6 * this.percentage, 180)

            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'position': 'absolute',
                'border-radius': '50%',
                'background-color': this.primary_color,
                'transform': 'rotate(' + fill + 'deg)', // 360 deg is 100%
                'transition': 'transform ' + this.transition_speed + 's',
                'clip': 'rect(0px, ' + this.circle_size/2 + 'px, ' + this.circle_size + 'px, 0px)',
                'backface-visibility': 'hidden', // prevent Chrome aliasing on transform transition
            }
        },
        fill_style_right() {
            // Max fill to 180 deg
            const fill = Math.min(3.6 * this.percentage, 180)

            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'position': 'absolute',
                'border-radius': '50%',
                'background-color': this.primary_color,
                'transform': 'rotate(' + fill + 'deg)', // 360 deg is 100%
                'transition': 'transform ' + this.transition_speed + 's',
                'clip': 'rect(0px, ' + this.circle_size + 'px, ' + this.circle_size + 'px, ' + this.circle_size / 2 + 'px)',
                'backface-visibility': 'hidden', // prevent Chrome aliasing on transform transition
            }
        },
    },
})
