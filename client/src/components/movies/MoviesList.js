import React from "react";
import Movie from "./Movie";
import { Pagination } from '@material-ui/lab';
import config from "../../env";
import './movies.css';

class MoviesList extends React.Component {
	state = {
		movies: [],
		totalPages: 0
	};

	constructor(props) {
		super(props);
		this.updateMovies(1)
	}

	updateMovies = (page) => {
		fetch(config.apiUrl + config.endpoints.movies.bestRated + '?username=' + JSON.parse(localStorage.getItem('user')).username + '&page=' + page)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data.movies, totalPages: data.totalPages})
			})
			.catch(console.log)
	};

	handleChange = (event, page) => {
		this.updateMovies(page)
	};

	render() {
		return <div
			className={'flex-container'}
		>
			{this.state.movies.map(movie => <Movie movie={movie} subscribed={movie.subscribed}/>)}
			<Pagination count={this.state.totalPages} shape="rounded" onChange={this.handleChange} page={this.state.page}/>
		</div>
	}
}

export default MoviesList;