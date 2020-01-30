import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import moment from "moment";
import config from '../../env';
import './movies.css';

class Movie extends React.Component {
	state = {
		subscribed: this.props.subscribed
	};

	posterUrl = 'https://image.tmdb.org/t/p/w500/' + this.props.movie.poster_path;

	username = JSON.parse(localStorage.getItem('user')).username;

	doSubscribe = () => {
		fetch(config.apiUrl + config.endpoints.subscriptions.subscribe, {
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				body: {
					username: this.username,
					movie: this.props.movie.id
				}
			})
		}).then(res => {
			this.setState({subscribed: res.status === 201});
		}).catch(err => {
			console.log(err);
		})
	};

	doUnsubscribe = () => {
		fetch(config.apiUrl + config.endpoints.subscriptions.unsubscribe, {
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				body: {
					username: this.username,
					movie: this.props.movie.id
				}
			})
		}).then(res => {
			this.setState({subscribed: res.status !== 200});
		}).catch(err => {
			console.log(err);
		})
	};

	render() {
		return <React.Fragment>
			<Card className={'card'}>
				<CardActionArea>
					<CardMedia
						className={'media'}
						image={this.posterUrl}
						title={this.props.movie.title}
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="h6">
							{this.props.movie.title}
						</Typography>
						<Typography gutterBottom variant="h7" component="h7">
							{this.props.movie.original_title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							Release Date : {moment.utc(this.props.movie.release_date).format('LL')}
						</Typography>
					</CardContent>
				</CardActionArea>
				<div
					className={'buttons-container'}
				>
					<CardActions
						className={'buttons'}
					>
						<Button size="small" color="primary" onClick={this.state.subscribed ? this.doUnsubscribe : this.doSubscribe}>
							{this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}
						</Button>
					</CardActions>
				</div>
			</Card>
		</React.Fragment>
	}
}

export default Movie;