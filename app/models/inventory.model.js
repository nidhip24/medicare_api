const sql = require("./db.js");

// constructor
const MedicineInventory = function(inventory) {
  this.generic_name = inventory.generic_name;
  this.brand_name = inventory.brand_name;
  this.expiry_date = inventory.expiry_date;
  this.quantity = inventory.quantity;
  this.lot_number = inventory.lot_number;
  this.unit_of_measure = inventory.unit_of_measure;
};

MedicineInventory.create = (newMedicineInventory, result) => {
  sql.query("INSERT INTO medicineinventory SET ?", newMedicineInventory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inv: ", { id: res.insertId, ...newMedicineInventory });
    result(null, { id: res.insertId, ...newMedicineInventory });
  });
};

MedicineInventory.findById = (id, result) => {
  sql.query(`SELECT * FROM medicineinventory WHERE id = ${id}`, (err, res) => {
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

    // not found MedicineInventory with the id
    result({ kind: "not_found" }, null);
  });
};

MedicineInventory.getAll = (title, result) => {
  let query = "SELECT * FROM medicineinventory";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicineinventory: ", res);
    result(null, res);
  });
};

MedicineInventory.getAllPublished = result => {
  sql.query("SELECT * FROM medicineinventory WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicineinventory: ", res);
    result(null, res);
  });
};

MedicineInventory.updateById = (id, inv, result) => {
  sql.query(
    "UPDATE medicineinventory SET title = ?, description = ?, published = ? WHERE id = ?",
    [inv.title, inv.description, inv.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found MedicineInventory with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated inv: ", { id: id, ...inv });
      result(null, { id: id, ...inv });
    }
  );
};

MedicineInventory.remove = (id, result) => {
  sql.query("DELETE FROM medicineinventory WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found MedicineInventory with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted inv with id: ", id);
    result(null, res);
  });
};

MedicineInventory.removeAll = result => {
  sql.query("DELETE FROM medicineinventory", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} medicineinventory`);
    result(null, res);
  });
};

module.exports = MedicineInventory;
