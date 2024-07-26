module.exports = app => {
  const register = require("../controllers/register.controller.js");

  var router = require("express").Router();

  // Create a new register
  router.post("/", register.create);

  // Retrieve all registers
  router.get("/", register.findAll);

  // Update a register with id
  router.put("/:id", register.update);

  // Delete a register with id
  router.delete("/:id", register.delete);

  app.use('/api/register', router);
};
