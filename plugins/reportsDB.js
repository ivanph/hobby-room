const nedb = require('nedb');
const dbname = 'reports';
let reports = new nedb({ filename: './' + dbname + '.nedb', autoload: true });

module.exports.reportsDB = reports;

exports.register = function (server, options, next) {
  server.expose(dbname, reports);
  next();
}

exports.register.attributes = {
  name: 'db',
  version: require('../package.json').version
};

