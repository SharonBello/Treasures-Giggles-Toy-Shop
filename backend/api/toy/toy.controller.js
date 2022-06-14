const toyService = require('./toy.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getToys(req, res) {
  try {
    logger.debug('Trying tog et toys')
    var queryParams = req.query;
    const toys = await toyService.query(queryParams)
    logger.debug('toy.controller 11 toys', toys)
    res.json(toys);
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

// GET BY ID 
async function getToyById(req, res) {
  try {
    const toyId = req.params.id;
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

// POST (add toy)
async function addToy(req, res) {
  try {
    const toy = req.body;
    logger.info('from toy.controller - addToy(req, res)', toy)
    const addedToy = await toyService.add(toy)
    logger.info('from toy.controller - addToy(req, res)', addedToy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}

// POST (add review)
async function addReview(req, res) {
  try {
    const toy = req.body;
    const review = req.body;
    const addedReview = await toyService.addUserReview(toy, review)
    res.json(addedReview)
  } catch (err) {
    logger.error('Failed to add review', err)
    res.status(500).send({ err: 'Failed to add review' })
  }
}

// PUT (Update toy)
async function updateToy(req, res) {
  try {
    const toy = req.body;
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })
  }
}

async function updateToyRate(req, res) {
  try {
    const toy = req.body;
    const rating = req.body;
    console.log('toy.controller 75 - toy',toy )
    // console.log('toy.controller 75 - rating', rating ) 
    const updatedRate = await toyService.updateUserRating(toy, rating)
    console.log('toy.controller 75 - updatedRate',updatedRate )
    res.json(updatedRate)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })
  }
}

// DELETE (Remove toy)
async function removeToy(req, res) {
  
  try {
    const toyId = req.params.id;
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

module.exports = {
  getToys,
  getToyById,
  addToy,
  addReview,
  updateToy,
  updateToyRate,
  removeToy
}
