import Axios from 'axios'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

const BASE_URL =
    process.env.NODE_ENV === 'production' ? '/api/auth/' : '//localhost:3030/api/auth/'

export const userService = {
    login,
    logout,
    // signup,
    getLoggedinUser,
    save,
    // addActivity
}

var axios = Axios.create({
    withCredentials : true
})


window.us = userService

function save(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return storageService.put(STORAGE_KEY, user)
}

// function login(credentials) {
//     return storageService.query(STORAGE_KEY).then(users => {
//         const user = users.find(user => user.username === credentials.username &&
//             user.password === credentials.password)
//             _handleLogin(user)
//         return user
//     })
// }

async function login(credentials){
    console.log('credentials',credentials )
    try {
        const url = BASE_URL +  'login'
        let user = await axios.post(url, credentials)
        user = user.data    
        console.log('user after axios', user)
        _handleLogin(user)
        return user
    } catch(err) {
        console.error('Error:', err)
    }
}


async function signup(userInfo) {
    // userInfo.balance = 1000
    // userInfo.prefs = { color: '#0000ff', bgColor: '#c1c1c1' }
    // userInfo.activities = []
    
    const user = await storageService.post(STORAGE_KEY, userInfo)
    _handleLogin(user)
    return user        
}

// function updateBalance(diff) {

//     const user = userService.getLoggedinUser()
//     user.balance += diff
//     return storageService.put(STORAGE_KEY, user)
//         .then((user) => {
//             sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
//             return user.balance
//         })
// }

async function logout() {
    try {
        const url = BASE_URL + 'logout'
        await axios.post(url)
        sessionStorage.removeItem('loggedinUser')
    }  catch(err) {
        console.error('Error:', err)
    }
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    // return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _handleLogin(user) {
    const miniUser = {username: user.username, isAdmin: user.isAdmin, _id: user._id}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(miniUser))
}

// function (activity) {
//     let user = getLoggedinUser()
//     user = {...user, activities: [...user.activities, activity]}
//     return storageService.put(STORAGE_KEY, user)
    
// }

// Test Data

// userService.signup({
//     username: 'muki',
//     password: 'muki',
//     fullname: 'Muki Ja',
//     balance: 10000,
//     prefs: { color: '#0000ff', bgColor: '#c1c1c1' },
//     activities: [{txt: 'Added a Toy', at: 1523873242735}]
// })

// userService.login({username: 'miki', password: 'miki'}
