const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    // console.log('filterBy in toy service query', filterBy)
    try {
        const criteria = _buildCriteria(filterBy)
        // const criteria = {}

        const collection = await dbService.getCollection('toy')
        // console.log('toy.service - line 13 - collection', collection)

        let sortBy = filterBy.sortBy 
        let sortType = 1
        if(sortBy === 'recent') {
            sortBy = 'createdAt'
            sortType = -1
        }
        let toys = await collection.find(criteria).sort({[sortBy]:sortType}).toArray()

        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                name: txtCriteria
            }
        ]
    }
    if (filterBy.labels.length) {
        const labels = filterBy.labels.split(',')
        criteria.labels = {$all: labels}
    }

    if (filterBy.inStock) {
        criteria.inStock =  JSON.parse(filterBy.inStock)
    }

    // const PAGE_SIZE = 3
    // if (filterBy.pageIdx !== undefined) {
    //     const startIdx = +filterBy.pageIdx * PAGE_SIZE
    //     // if (startIdx > toys.length - 1) return Promise.reject()
    //     toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
    // }

    // console.log('criteria', criteria, 'sortBy',filterBy.sortBy)

    return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    // TODO - add toy. description with make lorem
    try {
        const collection = await dbService.getCollection('toy')
        // const addedToy = await collection.insertOne(toy)
        await collection.insertOne(toy)
        // addedToy = addedToy.ops.pop()
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function addUserReview(toy, review) {
    try {
        let id = ObjectId(toy._id)
        const collection = await dbService.getCollection('toy')
        const updatedToy = await collection.updateOne({ _id: id }, { $set: { ...toy, review: review } })
        return updatedToy
    } catch (err) {
        logger.error('cannot add review', err)
        throw err
    }
}

async function update(toy) {
    
    try {
        let id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function updateUserRating(toy, rating) {
    try {
        let id = ObjectId(toy._id)
        const collection = await dbService.getCollection('toy')
        const updatedToy = await collection.updateOne({ _id: id }, { $set: { ...toy, rating: rating } })
        console.log('toy.service - 134 toy', toy)
        console.log('toy.service - 135 updatedToy', updatedToy)
        return updatedToy
    } catch (err) {
        logger.error('cannot add review', err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    updateUserRating,
    addUserReview
}