module.exports = {
	apiUrl: 'http://localhost:10010',
	endpoints: {
		movies: {
			bestRated: '/movies/bestrated'
		},
		subscriptions: {
			subscribe: '/subscribe',
			unsubscribe: '/unsubscribe'
		}
	}
};