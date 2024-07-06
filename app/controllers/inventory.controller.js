const MedicineInventory = require("../models/inventory.model.js");

// Create and Save a new MedicineInventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a MedicineInventory
  const inventory = new MedicineInventory({
    generic_name: req.body.generic_name,
    brand_name: req.body.brand_name,
    expiry_date: req.body.expiry_date,
    quantity: req.body.quantity,
    lot_number: req.body.lot_number,
    unit_of_measure: req.body.unit_of_measure,
  });

  // Save MedicineInventory in the database
  MedicineInventory.create(inventory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MedicineInventory."
      });
    else res.send(data);
  });
};

// Retrieve all MedicineInventorys from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  MedicineInventory.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inventorys."
      });
    else res.send(data);
  });
};

// Find a single MedicineInventory by Id
exports.findOne = (req, res) => {
  MedicineInventory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found MedicineInventory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving MedicineInventory with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published MedicineInventorys
exports.findAllPublished = (req, res) => {
  MedicineInventory.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inventorys."
      });
    else res.send(data);
  });
};

// Update a MedicineInventory identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  MedicineInventory.updateById(
    req.params.id,
    new MedicineInventory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found MedicineInventory with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating MedicineInventory with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a MedicineInventory with the specified id in the request
exports.delete = (req, res) => {
  MedicineInventory.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found MedicineInventory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete MedicineInventory with id " + req.params.id
        });
      }
    } else res.send({ message: `MedicineInventory was deleted successfully!` });
  });
};

// Delete all MedicineInventorys from the database.
exports.deleteAll = (req, res) => {
  MedicineInventory.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all inventorys."
      });
    else res.send({ message: `All MedicineInventorys were deleted successfully!` });
  });
};
