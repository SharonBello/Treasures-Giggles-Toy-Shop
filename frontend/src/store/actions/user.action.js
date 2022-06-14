import { userService } from '../../services/user.service.js'
import { showErrorMsg } from '../../services/event-bus.service.js'

export function logout() { // Action Creator
    return async dispatch => {
        try {
            await userService.logout()
            dispatch({
                    type: 'SET_USER',
                    user: null
            })
            
        } catch(err) {
                console.error('Error:', err)
                showErrorMsg('Cannot logout')
        }
    }
}

export function login(credentials) { // Action Creator
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
                console.error('Error:', err)
                showErrorMsg('Cannot login')
        }
    }
}

export function signup(credentials) { // Action Creator
    return async dispatch => {
        try {
            const user = userService.signup(credentials)            
            dispatch({
                type: 'SET_USER',
                user
            })
            } catch(err) {
                console.error('Error:', err)
                showErrorMsg('Cannot signup')
            }
    }
}


export function setUserMsg(msg) {
    return (dispatch) => {
        dispatch({
            type: 'SET_MSG',
            msg
        })
    }
}

