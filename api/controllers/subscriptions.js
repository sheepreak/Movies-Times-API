'use strict';

const config = require('./../../env');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client();
const moment = require('moment');

const postSubscribe = async (req, res) => {
    try {
        const body = req.swagger.params.body.value;

        if (!body.username) {
            console.log('no username given');
            res.status(400).send('no username given');
        }

        if (!body.movie) {

            console.log('no movie given');
            res.status(400).send('no movie given');
        }

        const id = body.username + '-' + moment.utc().valueOf();

        const result = await client.index({
            index: config.indices.subscriptions,
            id: body.username + '-' + moment.utc().valueOf(),
            body: {
                id: id,
                user_id: body.username,
                movie_id: body.movie,
                watched: false,
                subscription_date: moment.utc().valueOf()
            }
        });

        res.status(201).json(result.body.acknowledged);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

module.exports = {
    postSubscribe
};