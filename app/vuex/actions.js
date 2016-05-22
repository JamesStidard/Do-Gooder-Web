import tz from 'jstimezonedetect'


export const sign_in = function({dispatch}, {email, password}) {
    const set_current_user = user  => dispatch('CURRENT_USER_SET', user)
    const handle_error     = error => dispatch('ERROR_SET', error)
    this.$control
        .sign_in(email, password)
        .then(set_current_user)
        .catch(handle_error)
}

export const sign_out = function({dispatch}) {
    const delete_current_user = ()  => dispatch('CURRENT_USER_SET', null)
    const handle_error        = err => dispatch('ERROR_SET', err)
    this.$control
        .sign_out()
        .then(delete_current_user)
        .catch(handle_error)
}

export const get_todays_deeds = function({dispatch}) {
    const timezone         = tz.determine().name()
    const set_todays_deeds = deeds => dispatch('TODAYS_DEEDS_SET', deeds)
    const handle_error     = error => dispatch('ERROR_SET', error)
    this.$control
        .get_todays_deeds(timezone)
        .then(set_todays_deeds)
        .catch(handle_error)
}

export const get_deeds = function({dispatch}) {
    const set_deeds    = deeds => dispatch('DEEDS_SET', deeds)
    const handle_error = error => dispatch('ERROR_SET', error)
    this.$control
        .get_deeds()
        .then(set_deeds)
        .catch(handle_error)
}

export const insert_deed = function({dispatch}, description) {
    return new Promise((resolve, reject) => {  // eslint-disable-line no-undef
        const handle_error = error => {
            dispatch('ERROR_SET', error)
            reject(error)
        }
        this.$control
            .insert_deed(description)
            .then(deed => resolve(deed))
            .catch(handle_error)
    })
}

export const update_deed = function({dispatch}, {description}) {
    const handle_error = error => dispatch('ERROR_SET', error)
    this.$control
        .update_deed(description)
        .catch(handle_error)
}

export const delete_deed = function({dispatch}, id) {
    return new Promise((resolve, reject) => {  // eslint-disable-line no-undef
        const handle_error = error => {
            dispatch('ERROR_SET', error)
            reject(error)
        }
        this.$control
            .delete_deed(id)
            .then(resolve)
            .catch(handle_error)
    })
}
