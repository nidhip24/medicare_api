const MedicineDispensation = require("../models/distribution.model.js");

// Create and Save a new MedicineDispensation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a MedicineDispensation
  const distribution = new MedicineDispensation({
    date_dispensed: req.body.date_dispensed,
    generic_name: req.body.generic_name,
    brand_name: req.body.brand_name,
    unit_of_measure: req.body.unit_of_measure,
    quantity_dispensed: req.body.quantity_dispensed,
    lot_number: req.body.lot_number,
    expiration_date: req.body.expiration_date,
    patient_name: req.body.patient_name,
    patient_birth_date: req.body.patient_birth_date,
    patient_address: req.body.patient_address,
    patient_diagnosis: req.body.patient_diagnosis,
    end_user: req.body.end_user,
  });

  // Save MedicineDispensation in the database
  MedicineDispensation.create(distribution, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MedicineDispensation."
      });
    else res.send(data);
  });
};

// Retrieve all MedicineDispensations from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  MedicineDispensation.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving distributions."
      });
    else res.send(data);
  });
};

// Find a single MedicineDispensation by Id
exports.findOne = (req, res) => {
  MedicineDispensation.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found MedicineDispensation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving MedicineDispensation with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published MedicineDispensations
exports.findAllPublished = (req, res) => {
  MedicineDispensation.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving distributions."
      });
    else res.send(data);
  });
};

// Update a MedicineDispensation identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  MedicineDispensation.updateById(
    req.params.id,
    new MedicineDispensation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found MedicineDispensation with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating MedicineDispensation with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a MedicineDispensation with the specified id in the request
exports.delete = (req, res) => {
  MedicineDispensation.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found MedicineDispensation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete MedicineDispensation with id " + req.params.id
        });
      }
    } else res.send({ message: `MedicineDispensation was deleted successfully!` });
  });
};

// Delete all MedicineDispensations from the database.
exports.deleteAll = (req, res) => {
  MedicineDispensation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all distributions."
      });
    else res.send({ message: `All MedicineDispensations were deleted successfully!` });
  });
};
