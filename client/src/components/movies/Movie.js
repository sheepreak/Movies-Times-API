import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import './movies.css';

class Movie extends React.Component {


	render() {
		return <React.Fragment>
			<Card className={'card'}>
				<CardActionArea>
					{/*<CardMedia*/}
					{/*	className={classes.media}*/}
					{/*	image="/static/images/cards/contemplative-reptile.jpg"*/}
					{/*	title="Contemplative Reptile"*/}
					{/*/>*/}
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{this.props.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							Release Date : {this.props.release_date}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Subscribe
					</Button>
				</CardActions>
			</Card>
		</React.Fragment>
	}
}

export default Movie;