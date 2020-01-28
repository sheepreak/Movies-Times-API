module.exports = {
    indices: {
        movies: 'movies',
        users: 'users',
        subscriptions: 'subscriptions'
    },
    moviesApi: {
        uri: 'https://api.themoviedb.org/3',
        token: 'e772c845d189dcf4057908179e745927',
        endpoints: {
            bestRated: '/movie/top_rated'
        }
    }
};