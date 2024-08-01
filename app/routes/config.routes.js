module.exports = app => {
  const register = require("../controllers/config.controller.js");

  var router = require("express").Router();

  router.get("/", register.findAll);

  app.use('/api/config', router);
};
