

const initialState = {
    toy: null,
    toys: [],
    selectedOption: null,
    filterBy: {
        txt: '',
        inStock: true,
        labels: [],
        pageIdx: 0,
        sortBy: 'name'
    }
}

export function toyReducer(state = initialState, action) {
    let toys

    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'ADD_TOY':
            toys = [action.toy, ...state.toys]
            return { ...state, toys }
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        case 'UPDATE_TOY':
            toys = state.toys.map(currToy =>
                (currToy._id === action.toy._id) ? action.toy : currToy)
            return { ...state, toys }
        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        case 'GET_BY_ID':
                return {...state, toy: action.toy}
        case 'GET_SELECTED':
                return {...state, selectedOption: action.selectedOption}
        default:
            return state
    }
}
