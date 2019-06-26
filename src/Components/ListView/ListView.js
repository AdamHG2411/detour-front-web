import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import './ListView.css';

function deleteDetour(evt) {
	axios.delete(`http://localhost:8000/detours/${evt.target.name}`);
	navigate('/list');
}

function ListItem(props) {
	return (
		<div key={props.id} className="ListView-ListItem">
			<h3>{props.name}</h3>
			<p>
				{props.lat}, {props.lng}
			</p>
			<p>{props.notes}</p>
			<button className="ListItem-Button" name={props.id} onClick={deleteDetour}>
				Delete
			</button>
		</div>
	);
}

function ListView(props) {
	if (props.map.city) {
		let listItems = props.map.detours.map((thisDetour) => ListItem(thisDetour));
		return (
			<div className="ListView">
				<div className="ListView-Header">
					<div className="ListView-HeaderInfo">
						<h2>
							{props.map.title} - {props.map.city}, {props.map.country}
						</h2>
						<p>{props.map.description}</p>
					</div>

					<div className="ListView-HeaderButtons">
						<button>Share (coming soon)</button>
						<button
							onClick={(evt) => {
								evt.preventDefault();
								navigate('/new_detour');
							}}
						>
							New Detour
						</button>
					</div>
				</div>
				<div className="ListView-List">{listItems}</div>
			</div>
		);
	} else {
		return (
			<div className="ListView">
				<h2>Please select a map</h2>
			</div>
		);
	}
}

export default ListView;
