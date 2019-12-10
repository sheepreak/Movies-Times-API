'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client();
const fs = require('fs');
module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  client.ping({
    requestTimeout: 30000,
  }, (error) => {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('Everything is ok');
    }
  });

  createIndices();

  const port = process.env.PORT || 10010;
  app.listen(port);

  console.log('http://127.0.0.1:' + port);
});

const createIndices = () => {
  const indicesFile = fs.readFileSync('./scripts/indices.json');
  const indices = JSON.parse(indicesFile);

  indices.forEach(index => {
    client.indices.create(
        index,
        (err, resp) => {
          if (err) {
            console.log(err);
          } else {
            console.log("create", resp);
          }
        })
  });
};
