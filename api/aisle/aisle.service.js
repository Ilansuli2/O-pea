const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  query,
  getById,
};
async function query() {
  try {
    const collection = await dbService.getCollection("aisle");
    let aisles = await collection.find().toArray();
    return aisles;
  } catch (err) {
    logger.error("cannot find aisles", err);
    throw err;
  }
}

async function getById(aisleId) {
  try {
    const collection = await dbService.getCollection("aisle");
    const aisle = await collection.findOne({
      _id: ObjectId(aisleId),
    });
    delete aisle.password;

    // aisle.givenReviews = await reviewService.query({ byUserId: ObjectId(aisle._id) })
    // aisle.givenReviews = aisle.givenReviews.map(review => {
    //     delete review.byUser
    //     return review
    // })

    return aisle;
  } catch (err) {
    logger.error(`while finding aisle by id: ${aisleId}`, err);
    throw err;
  }
}
