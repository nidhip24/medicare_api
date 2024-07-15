module.exports = app => {
  const report = require("../controllers/report.controller.js");

  var router = require("express").Router();

  // Create a new Report
  // router.post("/", report.create);

  // Create a new Report
  router.post("/expiry_report", report.expiry_report);

  // Retrieve all Reports
  router.get("/", report.findAll);

  // Retrieve all published Reports
  router.get("/published", report.findAllPublished);

  // Retrieve a single Report with id
  router.get("/:id", report.findOne);

  // Update a Report with id
  router.put("/:id", report.update);

  // Delete a Report with id
  router.delete("/:id", report.delete);

  // Delete all Reports
  router.delete("/", report.deleteAll);

  app.use('/api/report', router);
};
