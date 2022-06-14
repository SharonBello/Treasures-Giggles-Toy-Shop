import { toyService } from "../../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

// Action Creators:
//for action that we want them to refresh in second tab
export function getActionRemoveToy(toyId) {
    return {
        type: 'REMOVE_TOY',
        toyId
    }
}
export function getActionAddToy(toy) {
    return {
        type: 'ADD_TOY',
        toy
    }
}
export function getActionUpdateToy(toy) {
    return {
        type: 'UPDATE_TOY',
        toy
    }
}

var subscriber

export function loadToy() {
    return async (dispatch, getState) => {
        try {
            const filterBy = getState().toyModule.filterBy
            const toys = await toyService.query(filterBy)
            dispatch({
                type: 'SET_TOYS',
                toys
            })                
        } catch(err) {
            console.error('Error:', err)
            // showErrorMsg('Toy was not loaded')
            showErrorMsg(err.response.data)
        }
        if (subscriber) toyService.unsubscribe(subscriber)
        subscriber = (ev) => {
            console.log('Got notified', ev.data)
            dispatch(ev.data)
        }
        toyService.subscribe(subscriber)
    }
}


export function removeToy(toyId) {
    return async dispatch => {
    try{
        await toyService.remove(toyId)
        console.log('Deleted Successfully!')
        dispatch(getActionRemoveToy(toyId))
        showSuccessMsg('Toy removed Succesfully!')
        } catch(err) {
            console.error('Error:', err)            
            showErrorMsg(err.response.data)
            // showErrorMsg('Toy was not removed')
        }
        if (subscriber) toyService.unsubscribe(subscriber)
            subscriber = (ev) => {
            console.log('Got notified', ev.data)
            dispatch(ev.data)
        }
        toyService.subscribe(subscriber)
    }
}

export function getById(toyId) {
    return async dispatch => {
        try {
        const toy = await toyService.getById(toyId)
        dispatch({
                    type: 'GET_BY_ID',
                    toy
                })        
        } catch(err) {
        console.error('Error:', err)
        // showErrorMsg('Toy was not loaded')
        showErrorMsg(err.response.data)
        }
    }
}

export function saveToy(toy) {
    return async dispatch => {        
        try {
        const savedToy = await toyService.save(toy)
        dispatch(getActionUpdateToy(toy))
        showSuccessMsg('Toy saved Succesfully!')
        } catch(err) {
            console.error('Error:', err)
            // showErrorMsg('Toy was not saved')
            showErrorMsg(err.response.data)
        }
        if (subscriber) toyService.unsubscribe(subscriber)
            subscriber = (ev) => {
            console.log('Got notified', ev.data)
            dispatch(ev.data)
        }
        toyService.subscribe(subscriber)
    }
}


export function addToy(toy) {
    return async dispatch => {
        try {
            const savedToy = await toyService.save(toy)
            dispatch(getActionAddToy(toy))
            showSuccessMsg('Toy added Succesfully!')
        } catch(err) {
            console.error('Error:', err)
            // showErrorMsg('Toy was not added')
            showErrorMsg(err.response.data)
        }
        if (subscriber) toyService.unsubscribe(subscriber)
        subscriber = (ev) => {
            console.log('Got notified', ev.data)
            dispatch(ev.data)
        }
        toyService.subscribe(subscriber)
    }
}


export function setFilter(filterBy) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_FILTERBY',
            filterBy,
        })
    }
}

export function setSelected(selectedOption) {
    return (dispatch) => {
        return dispatch({
            type: 'GET_SELECTED',
            selectedOption
        })
    }
}
