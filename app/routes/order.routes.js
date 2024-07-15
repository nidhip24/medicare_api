module.exports = app => {
  const order = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new Orders
  router.post("/", order.create);

  // Retrieve all Orders
  router.get("/", order.findAll);

  // Retrieve all published Orders
  router.get("/published", order.findAllPublished);

  // Retrieve a single Orders with id
  router.get("/:id", order.findOne);

  // Update a Orders with id
  router.put("/:id", order.update);

  // Delete a Orders with id
  router.delete("/:id", order.delete);

  // Delete all Orders
  router.delete("/", order.deleteAll);

  app.use('/api/order', router);
};
