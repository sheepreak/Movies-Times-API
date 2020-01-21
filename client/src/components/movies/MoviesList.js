import React from "react";
import Movie from "./Movie";
import moment from "moment";
import config from "../../env"

class MoviesList extends React.Component {
	state = {
		movies: []
	};

	componentDidMount() {
		fetch(config.apiUrl + config.endpoints.movies.list)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data})
			})
			.catch(console.log)
	}

	render() {
		return <React.Fragment>
			{this.state.movies.map(movie => <Movie name={movie.name} release_date={moment.utc(movie.release_date).format('DD-MM-YYYY')}/>)}
		</React.Fragment>
	}
}

export default MoviesList;