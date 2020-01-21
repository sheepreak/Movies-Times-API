import React from "react";
import { authService } from "../../services/auth.service";
import { Redirect } from "react-router-dom";

export class Logout extends React.Component {
	render() {
		authService.logout();

		return <Redirect to={{ pathname: '/', state: { from: this.props.location} }}/>;
	}
}