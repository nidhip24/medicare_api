module.exports = app => {
  const inventory = require("../controllers/inventory.controller.js");

  var router = require("express").Router();

  // Create a new Inventory
  router.post("/", inventory.create);

  // Retrieve all Inventory
  router.get("/", inventory.findAll);

  // Retrieve all published Inventory
  router.get("/published", inventory.findAllPublished);

  // Retrieve a single Inventory with id
  router.get("/:id", inventory.findOne);

  // Update a Inventory with id
  router.put("/:id", inventory.update);

  // Delete a Inventory with id
  router.delete("/:id", inventory.delete);

  // Delete all Inventory
  router.delete("/", inventory.deleteAll);

  app.use('/api/inventory', router);
};
