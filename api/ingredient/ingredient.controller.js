const ingredientService = require('./ingredient.service')
const logger = require('../../services/logger.service')

async function getIngredient(req, res) {
    try {
        const ingredient = await ingredientService.getById(req.params.id)
        res.send(ingredient)
    } catch (err) {
        logger.error('Failed to get ingredient', err)
        res.status(500).send({ err: 'Failed to get ingredient' })
    }
}

async function getIngredients(req, res) {
    try {
        const ingredients = await ingredientService.query()
        res.json(ingredients)
    } catch (err) {
        logger.error('Failed to get ingredients', err)
        res.status(500).send({ err: 'Failed to get ingredients' })
    }
}



module.exports = {
    getIngredient,
    getIngredients,
}