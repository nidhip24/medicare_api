const sql = require("./db.js");

// constructor
const Config = function(user) {
  this.name = user.name
};

const tableName = "appconfig";

Config.getAll = (title, result) => {
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

module.exports = Config;