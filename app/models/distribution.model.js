const sql = require("./db.js");

// constructor
const MedicineDispensation = function(distribution) {

  this.date_dispensed = distribution.date_dispensed,
    this.generic_name = distribution.generic_name,
    this.brand_name = distribution.brand_name,
    this.unit_of_measure = distribution.unit_of_measure,
    this.quantity_dispensed = distribution.quantity_dispensed,
    this.lot_number = distribution.lot_number,
    this.expiration_date = distribution.expiration_date,
    this.patient_name = distribution.patient_name,
    this.patient_birth_date = distribution.patient_birth_date,
    this.patient_address = distribution.patient_address,
    this.patient_diagnosis = distribution.patient_diagnosis
};

MedicineDispensation.create = (newMedicineDispensation, result) => {
  sql.query("INSERT INTO medicinedispensation SET ?", newMedicineDispensation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inv: ", { id: res.insertId, ...newMedicineDispensation });
    result(null, { id: res.insertId, ...newMedicineDispensation });
  });
};

MedicineDispensation.findById = (id, result) => {
  sql.query(`SELECT * FROM medicinedispensation WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found inv: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found MedicineDispensation with the id
    result({ kind: "not_found" }, null);
  });
};

MedicineDispensation.getAll = (title, result) => {
  let query = "SELECT * FROM medicinedispensation";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicinedispensation: ", res);
    result(null, res);
  });
};

MedicineDispensation.getAllPublished = result => {
  sql.query("SELECT * FROM medicinedispensation WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicinedispensation: ", res);
    result(null, res);
  });
};

MedicineDispensation.updateById = (id, inv, result) => {
  sql.query(
    "UPDATE medicinedispensation SET title = ?, description = ?, published = ? WHERE id = ?",
    [inv.title, inv.description, inv.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found MedicineDispensation with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated inv: ", { id: id, ...inv });
      result(null, { id: id, ...inv });
    }
  );
};

MedicineDispensation.remove = (id, result) => {
  sql.query("DELETE FROM medicinedispensation WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found MedicineDispensation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted inv with id: ", id);
    result(null, res);
  });
};

MedicineDispensation.removeAll = result => {
  sql.query("DELETE FROM medicinedispensation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} medicinedispensation`);
    result(null, res);
  });
};

module.exports = MedicineDispensation;
