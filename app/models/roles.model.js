const sql = require("./db.js");

// constructor
const Roles = function(user) {
  this.name = user.name
};

const tableName = "userroles";

Roles.getAll = (title, result) => {
  let query = "SELECT * FROM " + tableName;
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Roles;