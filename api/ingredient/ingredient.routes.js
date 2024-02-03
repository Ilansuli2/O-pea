const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getIngredient, getIngredients} = require('./ingredient.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getIngredients)
router.get('/:id', getIngredient)
// router.put('/:id',  updateUser)
// router.put('/:id',  requireAuth, updateUser)
// router.delete('/:id', deleteUser)
// router.delete('/:id',  requireAuth, requireAdmin, deleteUser)

module.exports = router