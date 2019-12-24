'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client();
const fs = require('fs');
const env = require('./env');
const moment = require('moment');
module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, async (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  await client.ping({
    requestTimeout: 30000,
  }, (error) => {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('Everything is ok');
    }
  });

  await createIndices();

  await createInitialData()

  const port = process.env.PORT || 10010;
  app.listen(port);

  console.log('http://127.0.0.1:' + port);
});

const createIndices = async () => {
  try {
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
  } catch (e) {
    console.log(e)
  }
};

const createInitialData = async () => {
  try {
    const moviesFile = fs.readFileSync('./scripts/movies.json');
    const movies = JSON.parse(moviesFile);
    const usersFile = fs.readFileSync('./scripts/users.json');
    const users = JSON.parse(usersFile);

    movies.forEach(doc => {
      client.index({
        index: env.indices.movies,
        id: doc.id + moment.utc().valueOf(),
        body: doc
      })
    });

    users.forEach(doc => {
      client.index({
        index: env.indices.users,
        id: doc.id + moment.utc().valueOf(),
        body: doc
      })
    });
  } catch (e) {
    console.log(e)
  }
};
