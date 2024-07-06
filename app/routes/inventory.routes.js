module.exports = app => {
  const inventory = require("../controllers/inventory.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", inventory.create);

  // Retrieve all Tutorials
  router.get("/", inventory.findAll);

  // Retrieve all published Tutorials
  router.get("/published", inventory.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", inventory.findOne);

  // Update a Tutorial with id
  router.put("/:id", inventory.update);

  // Delete a Tutorial with id
  router.delete("/:id", inventory.delete);

  // Delete all Tutorials
  router.delete("/", inventory.deleteAll);

  app.use('/api/inventory', router);
};
