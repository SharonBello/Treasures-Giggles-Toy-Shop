import { userService } from "../../services/user.service.js"


const initialState = {
    user: userService.getLoggedinUser(),
    msg: null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }
        case 'SET_USER_BALANCE':
            if (!state.user) return state
            return { ...state, user: { ...state.user, balance: action.balance } }
        case 'SET_MSG':
            return { ...state, msg: action.msg }
        default:
            return state
    }
}
