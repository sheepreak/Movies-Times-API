import React from "react";
import Movie from "./Movie";
import moment from "moment";

class MoviesList extends React.Component {
	render() {
		return <React.Fragment>
			<Movie name={'Movie 1'} release_date={moment.utc().format('DD-MM-YYYY')}/>
			<Movie name={'Movie 2'} release_date={moment.utc().format('DD-MM-YYYY')}/>
			<Movie name={'Movie 3'} release_date={moment.utc().format('DD-MM-YYYY')}/>
			<Movie name={'Movie 4'} release_date={moment.utc().format('DD-MM-YYYY')}/>
		</React.Fragment>
	}
}

export default MoviesList;