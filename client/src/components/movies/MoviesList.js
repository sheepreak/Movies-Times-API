import React from "react";
import Movie from "./Movie";
import config from "../../env";
import './movies.css';

class MoviesList extends React.Component {
	state = {
		movies: [],
		username: ''
	};

	componentDidMount() {
		fetch(config.apiUrl + config.endpoints.movies.bestRated)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data.movies, username: localStorage.getItem('user').username})
			})
			.catch(console.log)
	}

	render() {
		return <div
			className={'flex-container'}
		>
			{this.state.movies.map(movie => <Movie movie={movie} subscribed={false} username={this.state.username}/>)}
		</div>
	}
}

export default MoviesList;