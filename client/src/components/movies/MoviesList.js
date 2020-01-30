import React from "react";
import Movie from "./Movie";
import config from "../../env";
import './movies.css';

class MoviesList extends React.Component {
	state = {
		movies: []
	};

	componentDidMount() {
		fetch(config.apiUrl + config.endpoints.movies.bestRated + '?username=' + JSON.parse(localStorage.getItem('user')).username)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data.movies})
			})
			.catch(console.log)
	}

	render() {
		return <div
			className={'flex-container'}
		>
			{this.state.movies.map(movie => <Movie movie={movie} subscribed={movie.subscribed}/>)}
		</div>
	}
}

export default MoviesList;