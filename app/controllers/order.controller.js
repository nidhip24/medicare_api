const MedicineOrder = require("../models/order.model.js");

// Create and Save a new MedicineOrder
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a MedicineOrder
  const order = new MedicineOrder({
    date_requested: req.body.date_requested,
    mtid: req.body.mtid,
    quantity_requested: req.body.quantity_requested,
    requested_by: req.body.requested_by,
    health_station_name: req.body.health_station_name,
    uid: req.body.uid,
  });

  // Save MedicineOrder in the database
  MedicineOrder.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MedicineOrder."
      });
    else res.send(data);
  });
};

// Retrieve all MedicineOrders from the database (with condition).
exports.findAll = (req, res) => {
  const uid = req.query.uid;

  MedicineOrder.getAll(uid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Find a single MedicineOrder by Id
exports.findOne = (req, res) => {
  MedicineOrder.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found MedicineOrder with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving MedicineOrder with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published MedicineOrders
exports.findAllPublished = (req, res) => {
  MedicineOrder.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Update a MedicineOrder identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  MedicineOrder.updateById(
    req.params.id,
    new MedicineOrder(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found MedicineOrder with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating MedicineOrder with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a MedicineOrder with the specified id in the request
exports.delete = (req, res) => {
  MedicineOrder.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found MedicineOrder with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete MedicineOrder with id " + req.params.id
        });
      }
    } else res.send({ message: `MedicineOrder was deleted successfully!` });
  });
};

// Delete all MedicineOrders from the database.
exports.deleteAll = (req, res) => {
  MedicineOrder.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders."
      });
    else res.send({ message: `All MedicineOrders were deleted successfully!` });
  });
};
