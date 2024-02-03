const aisleService = require("./aisle.service");
const logger = require("../../services/logger.service");

async function getAisle(req, res) {
  try {
    const aisle = await aisleService.getById(req.params.id);
    res.send(aisle);
  } catch (err) {
    logger.error("Failed to get aisle", err);
    res.status(500).send({ err: "Failed to get aisle" });
  }
}

async function getAisles(req, res) {
  try {
    console.log(req.body, "controller");
    const aisles = await aisleService.query();
    res.json(aisles);
  } catch (err) {
    logger.error("Failed to get aisles", err);
    res.status(500).send({ err: "Failed to get aisles" });
  }
}

module.exports = {
  getAisle,
  getAisles,
};
