const Roles = require("../models/roles.model.js");

// Retrieve all Roless from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Roles.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};