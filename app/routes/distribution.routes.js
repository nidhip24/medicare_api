module.exports = app => {
  const distribution = require("../controllers/distribution.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", distribution.create);

  // Retrieve all Tutorials
  router.get("/", distribution.findAll);

  // Retrieve all published Tutorials
  router.get("/published", distribution.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", distribution.findOne);

  // Update a Tutorial with id
  router.put("/:id", distribution.update);

  // Delete a Tutorial with id
  router.delete("/:id", distribution.delete);

  // Delete all Tutorials
  router.delete("/", distribution.deleteAll);

  app.use('/api/distribution', router);
};
