const nedb = require('nedb');
const dbname = 'reports';
let reports = new nedb({ filename: './' + dbname + '.nedb' });

reports.loadDatabase(function (err) {
  if (err) {
    console.log('Failed to load db', err);
    process.abort();
  }
});

module.exports.reportsDB = reports;

exports.register = function (server, options, next) {
  server.expose(dbname, reports);
  next();
}

exports.register.attributes = {
  name: 'db',
  version: require('../package.json').version
};

