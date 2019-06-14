import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import axios from 'axios';
import NewMap from '../NewMap/NewMap.js';
import MapView from '../MapView/MapView.js';
import ListView from '../ListView/ListView.js';
import AddDetour from '../AddDetour/AddDetour.js';
import './App.css';

const detourLogo = require('../../assets/Artboard 1.png');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTitle: 'Map Title',
			newCity: 'City',
			newCountry: 'Country',
			newDescription: 'Description',
			curTitle: '',
			curCity: '',
			curCountry: '',
			curLatLng: [],
			curDescription: '',
			curDetours: [],
			curId: '',
			maps: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.createMap = this.createMap.bind(this);
		this.changeMap = this.changeMap.bind(this);
		this.fetchMaps = this.fetchMaps.bind(this);
	}

	handleChange(obj) {
		this.setState({
			[obj.name]: obj.value
		});
	}

	createMap() {
		console.log('App: createMap');
		axios
			.post('http://localhost:8000/maps/', {
				title: this.state.newTitle,
				city: this.state.newCity,
				country: this.state.newCountry,
				description: this.state.newDescription
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
				window.alert('Sorry, something went wrong');
			});
	}

	changeMap(evt) {
		console.log('App: changeMap');
		if (evt.target.value) {
			let selected = this.state.maps.filter((map) => {
				return map.id === parseInt(evt.target.value, 10);
			})[0];
			let coordinates;
			axios
				.get(
					`https://api.opencagedata.com/geocode/v1/geojson?q=${selected.city}%2C%20${selected.country}&key=1670b9f4cb2a4fc8944aa2118ded097a&language=en&pretty=1`
				)
				.then((res) => {
					coordinates = res.data.features[0].geometry.coordinates;
					axios.get('http://localhost:8000/detours').then((allDetours) => {
						let selectDetours = allDetours.data.filter((thisDetour) => {
							return thisDetour.map === `http://localhost:8000/maps/${selected.id}`;
						});
						this.setState({
							curTitle: selected.title,
							curCity: selected.city,
							curCountry: selected.country,
							curDescription: selected.description,
							curDetours: selectDetours,
							curId: selected.id,
							curLatLng: coordinates
						});
					});
				});
		}
	}

	fetchMaps() {
		console.log('App: fetchMaps');
		axios.get('http://localhost:8000/maps').then((res) => {
			this.setState({
				maps: res.data
			});
		});
	}

	render() {
		console.log('App: render');
		let currentMap;
		if (this.state.curTitle) {
			currentMap = {
				title: this.state.curTitle,
				city: this.state.curCity,
				country: this.state.curCountry,
				lat: this.state.curLatLng[1],
				lng: this.state.curLatLng[0],
				description: this.state.curDescription,
				detours: this.state.curDetours,
				id: this.state.curId
			};
		} else {
			currentMap = {
				title: 'Please select or create a map',
				city: '',
				country: '',
				description: '',
				id: ''
			};
		}
		let mapOptions = [];
		if (this.state.maps) {
			for (let i = 0; i < this.state.maps.length; i++) {
				mapOptions.push(
					<option key={this.state.maps[i].id} className="App-MapOption" value={this.state.maps[i].id}>
						{this.state.maps[i].title} ({this.state.maps[i].city})
					</option>
				);
			}
		}
		return (
			<div className="App">
				<aside className="App-Aside">
					<img className="App-Logo" src={detourLogo} alt="Detour Logo" />
					<nav className="App-Nav">
						{/* Replace links with variable paths once operational */}
						<Link className="App-NavLink" to="/new">
							New Map
						</Link>
						<Link className="App-NavLink" to="/list">
							List View
						</Link>
						<Link className="App-NavLink" to="/map">
							Map View
						</Link>
						<select className="App-MapSelector" onChange={this.changeMap}>
							<option className="App-MapOption">Select a map</option>
							{mapOptions}
						</select>
					</nav>
					<button className="App-SignOut">Sign Out</button>
				</aside>
				<main className="App-Content">
					<Router>
						<NewMap
							path="/new"
							handleChange={this.handleChange}
							createMap={this.createMap}
							{...this.state}
						/>
						<MapView path="/map" map={currentMap} />
						<ListView path="/list" map={currentMap} />
						<AddDetour path="/new_detour" map={currentMap} />
					</Router>
				</main>
			</div>
		);
	}

	componentDidMount() {
		console.log('App: componentDidMount');
		this.fetchMaps();
	}
}

export default App;
