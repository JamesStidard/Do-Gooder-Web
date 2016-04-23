import tmpl from './percentage-widget.html!text'
import Vue from 'vue'
import range from 'app/utils/range'


export default Vue.extend({
    template: tmpl,
    props: {
        percentage: {
            type: Number,
            required: true,
            coerce(value) {
                return Math.round(value)
            },
        },
        circle_size: {
            type: Number,
            default: 100,
        },
        primary_color: {
            type: String,
            default: 'white',
        },
        secondary_color: {
            type: String,
            default: 'black',
        },
        background_color: {
            type: String,
            default: 'red',
        },
        transition_speed: {
            type: Number,
            default: 1,
        },
        insert_size: {
            default: 85,
        },
        clockwise: {
            type: Boolean,
            default: true,
        },
        offset: {
            type: Number,
            default: 0,
        },
        semicircle: {
            type: Boolean,
            default: false,
        },
        show_text: {
            type: Boolean,
            default: true,
        },
        font_size: {
            type: Number,
            default: 22,
        },
        text_width: {
            type: Number,
            default: 56,
        },
    },
    computed: {
        numbers() {
            return ['-', ...range(0, 101)]
        },
        radial_progress_style() {
            const scale = this.clockwise ? '1' : '-1'
            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'border-radius': '50%',
                'background-color': this.secondary_color,
                'position': 'absolute',
                'transform': 'scaleX(' + scale + ') rotate(' + this.offset + 'deg)',
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
                'clip': 'rect(0px, ' + this.circle_size + 'px, ' + this.circle_size + 'px, ' + (this.circle_size / 2) + 'px)',
            }
        },
        rotation() {
            const full_size = this.semicircle ? 0.9 : 1.8
            return {
                'transform': 'rotate(' + this.percentage * full_size + 'deg)',
            }
        },
        fix_rotation() {
            const full_size = this.semicircle ? 1.8 : 3.6
            return {
                'transform': 'rotate(' + this.percentage * full_size + 'deg)',
            }
        },
        fill_style() {
            return {
                'background-color': this.primary_color,
                'clip': 'rect(0px, ' + (this.circle_size / 2) + 'px, ' + this.circle_size + 'px, 0px)',
            }
        },
        inset_style() {
            return {
                'width': this.insert_size + 'px',
                'height': this.insert_size + 'px',
                'position': 'absolute',
                'margin-left': ((this.circle_size - this.insert_size) / 2) + 'px',
                'margin-top': ((this.circle_size - this.insert_size) / 2) + 'px',
                'background-color': this.background_color,
                'border-radius': '50%',
            }
        },
        mask_semicircle_style() {
            return {
                'width': this.circle_size + 'px',
                'height': this.circle_size + 'px',
                'position': 'absolute',
                'background-color': this.background_color,
                'clip': 'rect(0px, ' + (this.circle_size / 2) + 'px, ' + this.circle_size + 'px, 0px)',
            }
        },
        percentage_text_style() {
            return {
                'width': this.text_width + 'px',
                'height': this.font_size + 'px',
                'position': 'absolute',
                'top': ((this.insert_size - this.font_size) / 2) + 'px',
                'left': ((this.insert_size - this.text_width) / 2) + 'px',
                'line-height': 1,
                'text-align': 'left',
                'color': this.primary_color,
                'font-size': this.font_size + 'px',
                'transition': 'width ' + this.transition_speed + 's',
                'overflow': 'hidden',
            }
        },
        numbers_style() {
            return {
                'margin-top': (-1 * this.font_size) + 'px',
                'transition': 'width ' + this.transition_speed + 's',
                'width': (this.percentage * this.text_width + this.text_width) + 'px',
            }
        },
        span_style() {
            return {
                'width': this.text_width + 'px',
                'display': 'inline-block',
                'vertical-align': 'top',
                'text-align': 'center',
            }
        },
    },
})
