const Config = require("../models/config.model.js");

// Retrieve all Configs from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Config.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};