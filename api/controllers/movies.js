'use strict';

const config = require('./../../env');
const superagent = require('superagent');

const getBestRatedMovies = async (req, res) => {
    try {
        const page = req.swagger.params.page.value;

        const movies = await fetchApiData(config.moviesApi.endpoints.bestRated, {
            page: page ? page : 1,
            adult: true
        });

        res.status(200).json({
            movies: movies.results,
            page: movies.page,
            totalPages: movies.total_pages,
            totalResults: movies.total_results
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

const fetchApiData = async (endpoint, opts) => {
    opts['api_key'] = config.moviesApi.token;

    let body = {};

    await superagent.get(config.moviesApi.uri + endpoint)
        .query(opts)
        .then(res => {
            body = res.body;
        });

    return body;
};

module.exports = {
    getBestRatedMovies
};