import React from "react";
import {Link} from "react-router-dom";

export class RouterComponent extends React.Component {
	render() {
		return <ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/movies">Movies</Link>
			</li>
			<li>
				<Link to="/logout">Logout</Link>
			</li>
		</ul>;
	}
}