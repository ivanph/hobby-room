const uuid = require('uuid/v4');
const reportsDB = require('../plugins/reportsDB').reportsDB;
const reports = {
  add: function (req, reply) {
    req.payload.type = 'report';
    req.payload._id = uuid();
    req.payload.timestamp = new Date().toISOString();
    reportsDB.insert(req.payload, (err, report) => {
      return reply({ _id: req.payload._id }).code(201);
    });
  },
  getAll: function (req, reply) {
    reportsDB.find({}, (err, reports) => {
      reply(reports);
    })
  }
}

module.exports = reports;
