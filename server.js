require('dotenv').config();
const hapi = require('hapi');
const glue = require('glue');

const pinoOptions = {
  prettyPrint: true,
  allTags: 'trace'
}

let internals = {
  manifest: {
    connections: [
      { port: process.env.WEB_PORT || 8080 },
    ],
    registrations: [
      { plugin: './plugins/reportsDB' },
      { plugin: './plugins/routes' },
      { plugin: 'vision' },
      { plugin : { register: 'hapi-pino', options: pinoOptions }}
    ]
  }
};

let startServer = function (server) {
  server.views({
    engines: { pug: require('pug') },
    path: __dirname + '/views',
    isCached: false
  });
  server.start(function () {
    server.connections.forEach((connection) => {
      let label = connection.settings.labels[0];
      console.log(`✅ Server is listening on ${connection.info.uri}`);
    })
  });
};

let serverError = function (error) {
  console.log(`Failed to start server with error ${error}`)
}
glue.compose(internals.manifest, { relativeTo: __dirname })
  .then((startServer))
  .catch(serverError);
