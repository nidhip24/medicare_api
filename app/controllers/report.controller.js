const Report = require("../models/report.model.js");
const { Parser } = require('json2csv');
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'nidhipkathiriya@gmail.com', // Replace with your email
      pass: 'xxxxxxxx' // Replace with your email password
  }
});

// Generate expiry report
exports.expiry_report = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Report
  const report = new Report({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    is_email_alert: req.body.is_email_alert,
    requested_by: req.body.requested_by,
    email: req.body.email
  });

  // get data from db
  Report.findByReport(report, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report."
      });
    else {
      var fields = ['generic_name', 'brand_name', 'expiry_date', 'quantity', 'lot_number', 'unit_of_measure', 'status'];
      var fieldNames = ['generic_name', 'brand_name', 'expiry_date', 'quantity', 'lot_number', 'unit_of_measure', 'status'];
      // var data = json2csv({ data: data, fields: fields, fieldNames: fieldNames });
      const opts = {
        fields: fields
      };
      const parser = new Parser(opts);
      const csv = parser.parse(data);
      res.attachment('filename.csv');
      res.send(csv);
    }
  });
};

// Generate expiry report email alerts
exports.expiry_report_email = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Report
  const report = new Report({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    is_email_alert: req.body.is_email_alert,
    requested_by: req.body.requested_by,
    email: req.body.email
  });

  // get data from db
  Report.findByReport(report, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report."
      });
    else {

      let html_body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Medicine Information Table</title><style>table {width: 100%;border-collapse: collapse;}th, td {padding: 8px 12px;border: 1px solid #ddd;text-align: left;}th {background-color: #f4f4f4;}</style></head><body><table><thead><tr><th>Generic Name</th><th>Brand Name</th><th>Expiry Date</th><th>Quantity</th><th>Lot Number</th><th>Unit of Measure</th><th>Status</th></tr></thead><tbody>`;
      data.forEach((item) => {
        if (item.status === 'Expired')
          html_body += `<tr><td>${item.generic_name}</td><td>${item.brand_name}</td><td>${item.expiry_date}</td><td>${item.quantity}</td><td>${item.lot_number}</td><td>${item.unit_of_measure}</td><td>${item.status}</td></tr>`;
      });

      // Email options
      let mailOptions = {
        from: 'nidhipkathiriya@gmail.com', // Sender address
        to: 'nidhipkathiriya@gmail.com', // List of recipients
        subject: 'Medicine Expiry Report', // Subject line
        text: 'Email Alerts', // Plain text body
        html: html_body // HTML body
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`Error: ${error}`);
        }
        console.log(`Message Sent: ${info.response}`);
      });
      res.send({"message": "Email alerts sent successfully!"});
    }
  });
};

// Retrieve all Reports from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Report.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Find a single Report by Id
exports.findOne = (req, res) => {
  Report.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Report with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Report with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Reports
exports.findAllPublished = (req, res) => {
  Report.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Update a Report identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Report.updateById(
    req.params.id,
    new Report(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Report with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Report with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Report with the specified id in the request
exports.delete = (req, res) => {
  Report.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Report with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Report with id " + req.params.id
        });
      }
    } else res.send({ message: `Report was deleted successfully!` });
  });
};

// Delete all Reports from the database.
exports.deleteAll = (req, res) => {
  Report.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders."
      });
    else res.send({ message: `All Reports were deleted successfully!` });
  });
};
