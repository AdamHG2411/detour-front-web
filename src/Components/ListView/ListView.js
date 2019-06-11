import React, { Component } from 'react';
import './ListView.css';

class ListView extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		return (
			<div className="ListView">
				<p>ListView</p>
			</div>
		);
	}
}

export default ListView;
