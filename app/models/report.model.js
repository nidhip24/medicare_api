const sql = require("./db.js");

// constructor
const Report = function(report) {
  this.start_date = report.start_date,
  this.end_date = report.end_date,
  this.is_email_alert = report.is_email_alert,
  this.requested_by = report.requested_by,
  this.email = report.email
};

const tableName = "medicineinventory";

Report.findByReport = (report, result) => {
  sql.query(`SELECT *, CASE
        WHEN expiry_date < CURRENT_DATE THEN 'Expired'
        WHEN expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7' DAY THEN 'About to Expire'
        ELSE 'Valid'
    END AS status FROM ${tableName} WHERE expiry_date <= CURRENT_DATE + INTERVAL '7' DAY`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Report with the id
    result({ kind: "not_found" }, null);
  });
};

// TODO: delete below


Report.create = (newReport, result) => {
  sql.query("INSERT INTO medicineorder SET ?", newReport, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inv: ", { id: res.insertId, ...newReport });
    result(null, { id: res.insertId, ...newReport });
  });
};


Report.findById = (id, result) => {
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

    // not found Report with the id
    result({ kind: "not_found" }, null);
  });
};

Report.getAll = (title, result) => {
  let query = "SELECT * FROM medicineorder";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
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

Report.getAllPublished = result => {
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

Report.updateById = (id, inv, result) => {
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
        // not found Report with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated inv: ", { id: id, ...inv });
      result(null, { id: id, ...inv });
    }
  );
};

Report.remove = (id, result) => {
  sql.query("DELETE FROM medicineorder WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Report with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted inv with id: ", id);
    result(null, res);
  });
};

Report.removeAll = result => {
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

module.exports = Report;
