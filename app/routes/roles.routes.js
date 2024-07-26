module.exports = app => {
  const register = require("../controllers/roles.controller.js");

  var router = require("express").Router();

  router.get("/", register.findAll);

  app.use('/api/roles', router);
};
