import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import Movies from './components/movies'
import Subscriptions from './components/subscriptions'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import NotFound from "./components/error/notfound";

const routing = (
	<Router>
		<div>
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/movies">Movies</Link>
			</li>
			<li>
				<Link to="/subscriptions">My Subscriptions</Link>
			</li>
		</ul>
		<Switch>
			<Route exact path="/" component={App} />
			<Route exact path="/movies" component={Movies} />
			<Route exact path="/subscriptions/:userId" component={Subscriptions} />
			<Route component={NotFound}/>
		</Switch>
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
