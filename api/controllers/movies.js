'use strict';

const config = require('./../../env');
const superagent = require('superagent');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client();

const getBestRatedMovies = async (req, res) => {
    try {
        const page = req.swagger.params.page.value;
        const username = req.swagger.params.username.value;

        if (!username) {
            console.log('No username given');
            res.status(400).send('No username given');
        }

        const movies = await fetchApiData(config.moviesApi.endpoints.bestRated, {
            page: page ? page : 1
        });

        await Promise.all(movies.results.map( movie => checkMoviesForSub(movie, username)));

        res.status(200).json({
            movies: movies.results,
            page: movies.page,
            totalPages: movies.total_pages,
            totalResults: movies.total_results
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
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

const checkMoviesForSub = async (movie, username) => {
    const result = await client.search({
        index: config.indices.subscriptions,
        body: {
            size: 1,
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                user_id: {
                                    value: username
                                }
                            }
                        },
                        {
                            term: {
                                movie_id: {
                                    value: movie.id
                                }
                            }
                        }
                    ]
                }
            }
        }
    });

    movie['subscribed'] = result.hits.hits.length !== 0;

    return movie;
};

module.exports = {
    getBestRatedMovies
};