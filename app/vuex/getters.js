

export function window_size(state) {
    return state.window_size
}

export function user(state) {
    return state.user
}

export function is_admin(state) {
    return state.user && state.user.type === 'admin'
}

export function todays_deeds(state) {
    return state.todays_deeds
}

export function deeds(state) {
    return state.deeds
}
