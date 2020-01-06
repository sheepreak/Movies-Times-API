import React from "react";

class Subscriptions extends React.Component {
	render() {
		console.log(this.props);
		const params = this.props.match.params;
		return (<div>
				<h1>My Subscriptions</h1>
				<h1>{params.userId}</h1>
		</div>
		);
	}
}

export default Subscriptions;