import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import Movies from './components/movies'
import Subscriptions from './components/subscriptions'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NotFound from "./components/error/notfound";
import {PrivateRoute} from "./components/private/PrivateRoute";
import {RouterComponent} from "./components/router/RouterComponent";
import {LoginPage} from "./components/auth/LoginPage";
import {Logout} from "./components/auth/Logout";

const routing = (
	<Router>
		<div>
			<RouterComponent/>
		<Switch>
			<PrivateRoute exact path="/" component={App} />
			<PrivateRoute exact path="/movies" component={Movies} />
			<PrivateRoute exact path="/subscriptions/:userId" component={Subscriptions} />
			<PrivateRoute exact path="/logout" component={Logout} />
			<Route path={'/login'} component={LoginPage}/>
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
