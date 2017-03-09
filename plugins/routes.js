'use strict';
const report =  require('../controllers/report');
const joi = require('joi');

const reportSchema = joi.object().keys({
  roomTemp: joi.number(),
	roomHumidity: joi.number(),
	roomCO2: joi.number(),
	roomLUX: joi.number(),
	nuteTemp: joi.number(),
	nuteConductivity: joi.number(),
	nutePH: joi.number(),
	nuteDO: joi.number(),
  nuteFlow: joi.number(),
	nuteLevel: joi.number()
});

let routes = [
  {
    method: 'POST',
    path: '/reports',
    config: {
      auth: false,
      validate: {
        payload: reportSchema
      }
    },
    handler: report.add
  },
  {
    method: 'GET',
    path: '/reports',
    config: {
      auth: false
    },
    handler: report.getAll
  }
];

exports.register = function (server, options, next) {
  server.bind({ reportsDB: server.plugins.db.reports });
  server.route(routes);
  next();
}

exports.register.attributes = {
  name: 'routes',
  version: require('../package.json').version
};