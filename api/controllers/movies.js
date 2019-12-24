'use strict';

const elasticsearch = require('elasticsearch');
const config = require('./../../env');
const client = new elasticsearch.Client();

const getMovies = async (req, res) => {
    try {
        const query = {
            size: 100
        };

        const results = await client.search({
            index: config.indices.movies,
            body: query
        });

        return res.json(results.hits.hits.map(el => el._source));
    } catch (e) {
        res.error(e);
    }
};

module.exports = {
    getMovies
};