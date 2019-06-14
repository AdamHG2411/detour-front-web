import React, { Component } from 'react';
import { navigate } from '@reach/router';
import './AddDetour.css';

class AddDetour extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			name: '',
			lat: '',
			lng: '',
			notes: ''
		};
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(evt) {
		evt.preventDefault();
		navigate('/list');
	}

	render() {
		console.log('AddDetour: render');
		return (
			<div className="AddDetour">
				<form className="AddDetourForm">
					<label>Name</label>
					<input type="text" name="name" />
					<label>Latitude</label>
					<input type="text" name="lat" />
					<label>Longitude</label>
					<input type="text" name="lng" />
					<label>Notes</label>
					<textarea rows={5} name="notes" />
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default AddDetour;
