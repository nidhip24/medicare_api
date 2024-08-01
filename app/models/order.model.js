const sql = require("./db.js");

// constructor
const MedicineOrder = function(inventory) {
  this.date_requested = inventory.date_requested,
  this.mtid = inventory.mtid,
  this.quantity_requested = inventory.quantity_requested,
  this.requested_by = inventory.requested_by,
  this.health_station_name = inventory.health_station_name,
  this.uid = inventory.uid
};

MedicineOrder.create = (newMedicineOrder, result) => {
  sql.query("INSERT INTO medicineorder SET ?", newMedicineOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inv: ", { id: res.insertId, ...newMedicineOrder });
    result(null, { id: res.insertId, ...newMedicineOrder });
  });
};

MedicineOrder.findById = (id, result) => {
  sql.query(`SELECT * FROM medicineorder WHERE id = ${id}`, (err, res) => {
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

    // not found MedicineOrder with the id
    result({ kind: "not_found" }, null);
  });
};

MedicineOrder.getAll = (uid, result) => {
  let query = "SELECT *, (select name from medicineusers where id = uid) as added_by FROM medicineorder";

  if (uid) {
    query += ` WHERE uid = ${uid}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicineorder: ", res);
    result(null, res);
  });
};

MedicineOrder.getAllPublished = result => {
  sql.query("SELECT * FROM medicineorder WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicineorder: ", res);
    result(null, res);
  });
};

MedicineOrder.updateById = (id, inv, result) => {
  sql.query(
    "UPDATE medicineorder SET title = ?, description = ?, published = ? WHERE id = ?",
    [inv.title, inv.description, inv.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found MedicineOrder with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated inv: ", { id: id, ...inv });
      result(null, { id: id, ...inv });
    }
  );
};

MedicineOrder.remove = (id, result) => {
  sql.query("DELETE FROM medicineorder WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found MedicineOrder with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted inv with id: ", id);
    result(null, res);
  });
};

MedicineOrder.removeAll = result => {
  sql.query("DELETE FROM medicineorder", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} medicineorder`);
    result(null, res);
  });
};

module.exports = MedicineOrder;
