import React, { Component } from 'react';
import './MapView.css';

class MapView extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		return (
			<div className="MapView">
				<p>MapView</p>
			</div>
		);
	}
}

export default MapView;
