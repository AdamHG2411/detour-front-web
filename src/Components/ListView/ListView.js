import React, { Component } from 'react';

class ListView extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		return (
			<div>
				<p>ListView</p>
			</div>
		);
	}
}

export default ListView;
