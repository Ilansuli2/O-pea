const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  query,
  getById,
};
async function query() {
  try {
    const collection = await dbService.getCollection("ingredient");
    let ingredients = await collection.find().toArray();
    return ingredients;
  } catch (err) {
    logger.error("cannot find ingredients", err);
    throw err;
  }
}

async function getById(ingredientId) {
  try {
    const collection = await dbService.getCollection("ingredient");
    const ingredient = await collection.findOne({
      _id: ObjectId(ingredientId),
    });
    delete ingredient.password;

    // ingredient.givenReviews = await reviewService.query({ byUserId: ObjectId(ingredient._id) })
    // ingredient.givenReviews = ingredient.givenReviews.map(review => {
    //     delete review.byUser
    //     return review
    // })

    return ingredient;
  } catch (err) {
    logger.error(`while finding ingredient by id: ${ingredientId}`, err);
    throw err;
  }
}
