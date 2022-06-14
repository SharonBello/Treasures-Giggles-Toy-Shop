
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toy'
const PAGE_SIZE = 3
const gLabels = ["All", "On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getNumOfPages,
    getLabels,
    getDataForCharts,
}

function query(filterBy = { txt: '', pageIdx: 0, labels: [] }) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name) || regex.test(toy.ctg))
            }
    
            if (filterBy.labels.length > 0) {
                toys = toys.filter(toy =>
                    toy.labels.filter(label => filterBy.labels.includes(label)).length > 0)
            }

            if (filterBy.inStock) {        
                toys = toys.filter(toy => {                    
                    return JSON.parse(filterBy.inStock) === toy.inStock
                })
            }
            
            if (filterBy.sortBy === 'name') {
                toys = toys.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                })

            } else if (filterBy.sortBy === 'price') {
                toys = toys.sort((a, b) => a[filterBy.sortBy] - b[filterBy.sortBy])
            } else if (filterBy.sortBy === 'recent') {
                toys = toys.sort((a, b) => b.createdAt - a.createdAt)
            }
            
            if (filterBy.pageIdx !== undefined) {
                const startIdx = +filterBy.pageIdx * PAGE_SIZE
                if (startIdx > toys.length - 1) return Promise.reject()
                toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
            }

            return toys
        })
}

function getLabels() {
    return gLabels
}

async function getDataForCharts() {
    const labels = getLabels()
    let toys = await query()
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
    return storageService.get(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        review: 'Best ever',
        inStock: true,
        img: ''
    }
}

function getNumOfPages() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

// TEST DATA
//  storageService.post(STORAGE_KEY, {name: 'Robot', price: 50.30,labels: ["On wheels", "Baby"], "createdAt": 1631031801010, "inStock": true, "review": 'Ok', img: '../assets/img/Train.jpg'}).then(x => console.log(x))

