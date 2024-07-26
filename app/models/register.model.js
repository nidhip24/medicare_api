const sql = require("./db.js");

// constructor
const RegisterUser = function(user) {
  this.rid = user.rid,
  this.name = user.name,
  this.email = user.email,
  this.healthstation = user.healthstation
};

const tableName = "medicineusers";

RegisterUser.create = (newRegisterUser, result) => {
  sql.query("INSERT INTO " + tableName + " SET ?", newRegisterUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inv: ", { id: res.insertId, ...newRegisterUser });
    result(null, { id: res.insertId, ...newRegisterUser });
  });
};

RegisterUser.getAll = (title, result) => {
  let query = "SELECT * FROM " + tableName;

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

RegisterUser.updateById = (id, inv, result) => {
  sql.query(
    "UPDATE " + tableName + " SET rid = ?, name = ?, email = ?, healthstation = ? WHERE id = ?",
    [inv.rid, inv.name, inv.email, inv.healthstation, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found RegisterUser with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated inv: ", { id: id, ...inv });
      result(null, { id: id, ...inv });
    }
  );
};

RegisterUser.remove = (id, result) => {
  sql.query("DELETE FROM " + tableName + " WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found RegisterUser with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted inv with id: ", id);
    result(null, res);
  });
};

module.exports = RegisterUser;