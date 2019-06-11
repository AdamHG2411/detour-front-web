import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import NewMap from '../NewMap/NewMap.js';
import MapView from '../MapView/MapView.js';
import ListView from '../ListView/ListView.js';
import './App.css';

const detourLogo = require('../../assets/Artboard 1.png');

class App extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		console.log('App: render');
		return (
			<div className="App">
				<aside className="App-Aside">
					<img className="App-Logo" src={detourLogo} alt="Detour Logo" />
					<nav className="App-Nav">
						{/* Replace links with variable paths once operational */}
						<Link className="App-NavLink" to="/new">
							New Map
						</Link>
						<Link className="App-NavLink" to="/1/list">
							List View
						</Link>
						<Link className="App-NavLink" to="/1/map">
							Map View
						</Link>
						<select className="App-MapSelector">
							<option className="App-MapOption">Select a map</option>
						</select>
					</nav>
					<button className="App-SignOut">Sign Out</button>
				</aside>
				<main className="App-Content">
					<Router>
						<NewMap path="/new" />
						<MapView path="/:collectionId/map" />
						<ListView path="/:collectionId/list" />
					</Router>
				</main>
			</div>
		);
	}
}

export default App;
