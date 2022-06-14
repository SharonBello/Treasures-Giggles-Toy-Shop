const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        
        const collection = await dbService.getCollection('review')

        // const reviews = await collection.find(criteria).toArray()
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'toyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            },
            {
                $lookup:
                {//How to name the field in our filter
                    localField: 'userId',
                    from: 'user',
                    foreignField: '_id',//the name of the db field
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            
            review.toy = { _id: review.toy._id, name: review.toy.name }
            review.user = { _id: review.user._id, fullname: review.user.fullname }
            delete review.toyId
            delete review.userId
            return review
        })
        console.log('reviews 49: @@@@@@@@@@@@@@@@@@@@@@@@@@@', reviews)
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    
    try {
        const reviewToAdd = {
            userId: ObjectId(review.userId),
            toyId: ObjectId(review.toyId),
            content: review.content
        }
        
        const collection = await dbService.getCollection('review')
        
        await collection.insertOne(reviewToAdd)
        
        return reviewToAdd;

    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    // if (filterBy.byToyId) criteria.toyId = ObjectId(filterBy.byToyId)
    
    if (filterBy.byUserId) criteria.userId = ObjectId(filterBy.byUserId)
    if (filterBy.byToyId) criteria.toyId = ObjectId(filterBy.byToyId)
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


