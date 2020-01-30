'use strict';

const config = require('./../../env');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client();
const moment = require('moment');

const postSubscribe = async (req, res) => {
    try {
        const body = req.swagger.params.body.value.body;

        if (!body.username) {
            console.log('no username given');
            res.status(400).send('no username given');
        }

        if (!body.movie) {

            console.log('no movie given');
            res.status(400).send('no movie given');
        }

        const id = body.username + '-' + body.movie;

        await client.index({
            index: config.indices.subscriptions,
            id: id,
            body: {
                id: id,
                user_id: body.username,
                movie_id: body.movie,
                watched: false,
                subscription_date: moment.utc().valueOf()
            },
            op_type: 'create'
        });

        res.status(201).send();
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

const postUnsubscribe = async (req, res) => {
    try {
        const body = req.swagger.params.body.value.body;

        if (!body.username) {
            console.log('no username given');
            res.status(400).send('no username given');
        }

        if (!body.movie) {
            console.log('no movie given');
            res.status(400).send('no movie given');
        }

        await client.deleteByQuery({
            index: config.indices.subscriptions,
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                term: {
                                    user_id: {
                                        value: body.username
                                    }
                                }
                            },
                            {
                                term: {
                                    movie_id: {
                                        value: body.movie
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        });

        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    postSubscribe,
    postUnsubscribe
};