module.exports = app => {
  const distribution = require("../controllers/distribution.controller.js");

  var router = require("express").Router();

  // Create a new Distribution
  router.post("/", distribution.create);

  // Retrieve all Distributions
  router.get("/", distribution.findAll);

  // Retrieve all published Distributions
  router.get("/published", distribution.findAllPublished);

  // Retrieve a single Distribution with id
  router.get("/:id", distribution.findOne);

  // Update a Distribution with id
  router.put("/:id", distribution.update);

  // Delete a Distribution with id
  router.delete("/:id", distribution.delete);

  // Delete all Distributions
  router.delete("/", distribution.deleteAll);

  app.use('/api/distribution', router);
};
