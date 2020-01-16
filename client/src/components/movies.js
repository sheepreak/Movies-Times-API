import React from "react";
import MoviesList from './movies/MoviesList'

class Movies extends React.Component {
	render() {
		return <React.Fragment>
			<h1>Movies</h1>
			<MoviesList />
		</React.Fragment>
	}
}

export default Movies;