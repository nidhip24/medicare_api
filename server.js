const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

require("./app/routes/inventory.routes.js")(app);
require("./app/routes/distribution.routes.js")(app);

require("./app/routes/order.routes.js")(app);
require("./app/routes/report.routes.js")(app);

require("./app/routes/register.routes.js")(app);
require("./app/routes/roles.routes.js")(app);

require("./app/routes/config.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
