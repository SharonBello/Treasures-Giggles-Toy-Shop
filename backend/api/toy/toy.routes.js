const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, addReview, updateToyRate } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:id', getToyById)
router.post('/', requireAuth, requireAdmin, addToy)
router.post('/:id', requireAuth, addReview)
router.put('/', requireAuth, updateToyRate)
router.put('/:id', requireAuth, requireAdmin, updateToy)
router.delete('/:id',requireAdmin, requireAuth, removeToy)

module.exports = router