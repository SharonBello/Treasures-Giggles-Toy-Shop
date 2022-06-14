import Axios from 'axios'
import { getActionRemoveToy, getActionAddToy, getActionUpdateToy } from '../store/actions/toy.action.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'toy'
// const BASE_URL = '/api/toy/'
const toyChannel = new BroadcastChannel('toyChannel')

const gLabels = ["all", "on wheels", "box game", "art", "baby", "doll", "puzzle", "outdoor"]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getAllToys,
    getNumOfPages,
    subscribe,
    unsubscribe,
    saveUserRating,
    getDataForCharts,
    getLabels,
}
const PAGE_SIZE = 3
const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '/api/toy/'
        : 'http://localhost:3030/api/toy/'

var axios = Axios.create({
    withCredentials: true,
})

function getAllToys() {
    query()
        .then(toys => toys)
}

function getLabels() {
    return gLabels
}

async function query(filterBy = {} ){
    
    const {txt = '', inStock = '', labels ='', pageIdx = '', sortBy = 'createdAt'} = filterBy
    const url = `?txt=${txt}&inStock=${inStock}&labels=${labels}&pageIdx=${pageIdx}&sortBy=${sortBy}`
    const urlToRequest = BASE_URL+url
    const toys = await axios.get(urlToRequest)
    if(pageIdx === '') return toys
    let fromIdx = +filterBy.pageIdx * PAGE_SIZE
    let toysByPage = toys.data.slice(fromIdx, fromIdx+PAGE_SIZE)
    // return toys.data
    return toysByPage
}

async function getDataForCharts() {
    const labels = getLabels()
    let toys = await query()
    toys = toys.data
    const pricePerType = labels.reduce((acc, label) => {
        let sum = 0
        let count = 0
        toys.forEach(toy => {
            if (toy.labels.includes(label)) {
                count++
                sum += +toy.price
            }
        })
        acc[label] = sum / count
        return acc
    }, {})
    const invPerType = labels.reduce((acc, label) => {
        let sum = 0
        toys.forEach(toy => {
            if (toy.inStock && toy.labels.includes(label)) {
                sum += 1
            }
        })
        acc[label] = sum
        return acc
    }, {})

    // })


    return [
        _creataDataChart(Object.keys(pricePerType), 'Avg price per category', Object.values(pricePerType), 'Price'),
        _creataDataChart(Object.keys(invPerType), 'Amout per type', Object.values(invPerType), 'Category')

    ]

}
function _creataDataChart(labels, title, data, label) {
    return {
        title,
        labels,
        datasets: [
            {

                label,
                data,
                backgroundColor: [
                    'rgba(255, 20, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 45, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 69, 64, 1)',
                    'rgba(255, 120, 120, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 120, 120, 1)',

                ],
                borderWidth: 1,
            },
        ]

    }
}

function getById(toyId) {
    // return axios.get(BASE_URL + toyId).then(res => res.data)
    const toy = httpService.get(`toy/${toyId}`)
    return toy
}

async function remove(toyId) {
    
    // await axios.delete(BASE_URL + toyId)
    await httpService.delete(`toy/${toyId}`)
    toyChannel.postMessage(getActionRemoveToy(toyId))
    return toyId
}

async function save(toy) {
    var savedToy
    if (toy._id) {
       
        savedToy = await axios.put(BASE_URL + toy._id, toy)
        savedToy = savedToy.data
        toyChannel.postMessage(getActionUpdateToy(savedToy))
    } else {
        savedToy = await axios.post(BASE_URL, toy)
        savedToy = savedToy.data
        toyChannel.postMessage(getActionAddToy(savedToy))
    }
    return savedToy
}


async function getNumOfPages() {

    const toys = await query()    
    const toysQty = toys.data.length / PAGE_SIZE
    return toysQty
    // return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

function subscribe(listener) {
    toyChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    toyChannel.removeEventListener('message', listener)
}

async function saveUserRating(toy) {
    const savedToy = await axios.put(BASE_URL + toy._id, toy)
    console.log(savedToy)
    // return savedToy
}