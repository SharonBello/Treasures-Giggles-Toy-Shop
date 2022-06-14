

const gToys = require('../data/toy.json')
const PAGE_SIZE = 4
const gLabels = ["All", "On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
const fs = require('fs')
const utilService = require('./util.service')

module.exports = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getNumOfPages,
    getLabels
}

//filter
function query({ txt = '', pageIdx = 0, labels = [], sortBy = 'name', inStock = true, rating = 0 }) {
    let toys = gToys
    if (txt) {
        const regex = new RegExp(txt, 'i')
        toys = toys.filter(toy => regex.test(toy.name) || regex.test(toy.ctg))
    }

    if (labels?.length > 0) {
        toys = toys.filter(toy => {
            return labels.every(label => {
                return toy.labels.includes(label);
            });
        })
    }


    if (inStock) {
        toys = toys.filter(toy => {
            return JSON.parse(inStock) === toy.inStock
        })
    }

    if (sortBy === 'name') {
        toys = toys.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            return 0
        })

    } else if (sortBy === 'price') {
        toys = toys.sort((a, b) => a.price - b.price)
    } else {
        toys = toys.sort((a, b) => b.createdAt - a.createdAt)
    }

    // if (pageIdx !== undefined) {
    //     const startIdx = +pageIdx * PAGE_SIZE
    //     if (startIdx > toys.length - 1) return Promise.reject()
    //     toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
    // }

    return Promise.resolve(toys)
}

function getLabels() {
    return gLabels
}

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function save(toy) {
    if (toy._id) {
        const idx = gToys.findIndex(currToy => currToy._id === toy._id)
        gToys[idx].name = toy.name
        gToys[idx].price = toy.price
        gToys[idx].img = toy.img
        gToys[idx].inStock = toy.inStock
        gToys[idx].labels = toy.labels
        gToys[idx].rating = toy.rating
    } else {
        toy._id = utilService.makeId()
        gToys.unshift(toy)
    }
    return _saveToysToFile().then(() => toy)
}

function remove(toyId) {
    console.log('toyId', toyId)
    const idx = gToys.findIndex(currToy => currToy._id === toyId)
    gToys.splice(idx, 1)
    return _saveToysToFile()
}


function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        review: 'Best ever',
        inStock: true,
        img: '',
        rating: 0
    }
}

function getNumOfPages() {
    return gToys.length / PAGE_SIZE
    // return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) {
                console.log(err)
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}
