const RegisterUser = require("../models/register.model.js");

// Create and Save a new RegisterUser
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a RegisterUser
  const order = new RegisterUser({
    rid: req.body.rid,
    name: req.body.name,
    email: req.body.email,
    healthstation: req.body.healthstation,
  });

  // Save RegisterUser in the database
  RegisterUser.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the RegisterUser."
      });
    else res.send(data);
  });
};

// Retrieve all RegisterUsers from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  RegisterUser.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Update a RegisterUser identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  RegisterUser.updateById(
    req.params.id,
    new RegisterUser(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found RegisterUser with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating RegisterUser with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a RegisterUser with the specified id in the request
exports.delete = (req, res) => {
  RegisterUser.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RegisterUser with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete RegisterUser with id " + req.params.id
        });
      }
    } else res.send({ message: `RegisterUser was deleted successfully!` });
  });
};
