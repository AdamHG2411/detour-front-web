import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import './MapView.css';
import 'mapbox-gl/dist/mapbox-gl.css';

class MapView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewport: {
				width: 400,
				height: 400,
				latitude: 37.7577,
				longitude: -122.4376,
				zoom: 8
			}
		};
	}

	render() {
		console.log('MapView: render');
		//Note: Access token will change in deployed build
		return (
			<div className="MapView">
				<h2>
					{this.props.title} - {this.props.city}, {this.props.country}
				</h2>
				<p>{this.props.description}</p>
				<button>Share (coming soon)</button>
				<button>New Detour</button>
				<div className="MapView-MapContainer">
					<ReactMapGL
						{...this.state.viewport}
						onViewportChange={(viewport) => this.setState({ viewport })}
						mapboxApiAccessToken="pk.eyJ1IjoiYWRhbWhnMjQxMSIsImEiOiJjand1c2g4eGQwYmw4NDNuMXEzbGU0ZWVjIn0.cEA146rX1jg_LqwNAwVrdg"
						mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
					/>
				</div>
			</div>
		);
	}

	componentDidMount() {
		if (this.props.map.lat) {
			this.setState({
				viewport: {
					width: 400,
					height: 400,
					latitude: this.props.map.lat,
					longitude: this.props.map.lng,
					zoom: 8
				}
			});
		}
	}

	componentDidUpdate() {
		if (this.state.viewport.latitude !== this.props.map.lat) {
			this.setState({
				viewport: {
					width: 400,
					height: 400,
					latitude: this.props.map.lat,
					longitude: this.props.map.lng,
					zoom: 8
				}
			});
		}
	}
}

export default MapView;
