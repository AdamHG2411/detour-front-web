import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { navigate } from '@reach/router';
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
			},
			selectedCity: ''
		};
	}

	render() {
		console.log('MapView: render');
		let cityMap = <h2>Please select a map</h2>;
		if (this.props.map.city) {
			let detourMarkers = this.props.map.detours.map((thisDetour) => {
				return (
					<Marker
						className="MapView-Marker"
						key={thisDetour.id}
						latitude={thisDetour.lat}
						longitude={thisDetour.lng}
					>
						{thisDetour.name}
					</Marker>
				);
			});
			cityMap = (
				<ReactMapGL
					{...this.state.viewport}
					onViewportChange={(viewport) => this.setState({ viewport })}
					mapboxApiAccessToken="pk.eyJ1IjoiYWRhbWhnMjQxMSIsImEiOiJjand1c2g4eGQwYmw4NDNuMXEzbGU0ZWVjIn0.cEA146rX1jg_LqwNAwVrdg"
					mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
				>
					{detourMarkers}
				</ReactMapGL>
			);
		}
		return (
			<div className="MapView">
				<h2>
					{this.props.map.title} - {this.props.map.city}, {this.props.map.country}
				</h2>
				<p>{this.props.map.description}</p>
				<button>Share (coming soon)</button>
				<button
					onClick={(evt) => {
						evt.preventDefault();
						navigate('/new_detour');
					}}
				>
					New Detour
				</button>
				<div className="MapView-MapContainer">{cityMap}</div>
			</div>
		);
	}

	componentDidMount() {
		if (this.props.map.city && this.state.selectedCity !== this.props.map.city) {
			this.setState((prevState) => ({
				viewport: {
					...prevState.viewport,
					latitude: this.props.map.lat,
					longitude: this.props.map.lng,
					zoom: 8
				},
				selectedCity: this.props.map.city
			}));
		}
	}

	componentDidUpdate() {
		if (this.props.map.city && this.state.selectedCity !== this.props.map.city) {
			this.setState((prevState) => ({
				viewport: {
					...prevState.viewport,
					latitude: this.props.map.lat,
					longitude: this.props.map.lng,
					zoom: 8
				},
				selectedCity: this.props.map.city
			}));
		}
	}
}

export default MapView;
