'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client();
const fs = require('fs');
const env = require('./env');
const moment = require('moment');
const bcrypt = require('bcrypt');
module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, async (err, swaggerExpress) => {
  try {
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
  } catch (e) {
    console.log(e)
  }
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
    const usersFile = fs.readFileSync('./scripts/users.json');
    const users = JSON.parse(usersFile);

    users.forEach(doc => {
      client.deleteByQuery({
        index: env.indices.users,
        body: {
          query: {
            bool: {
              must: [
                {
                  term: {
                    id: {
                      value: doc.id
                    }
                  }
                }
              ]
            }
          }
        }
      });

      doc['hash'] = bcrypt.hashSync(doc.password, 10);
      delete doc.password;

      client.index({
        index: env.indices.users,
        id: doc.id + '-' + moment.utc().valueOf(),
        body: doc
      })
    });
  } catch (e) {
    console.log(e)
  }
};
