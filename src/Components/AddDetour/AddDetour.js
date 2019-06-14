import React, { Component } from 'react';
import axios from 'axios';
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
		this.handleDetourInput = this.handleDetourInput.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	handleDetourInput(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	submitForm(evt) {
		evt.preventDefault();
		if (this.state.name && this.state.lat && this.state.lng) {
			let req = {
				name: this.state.name,
				lat: this.state.lat,
				lng: this.state.lng,
				notes: this.state.notes,
				map_id: this.props.map.id
			};
			console.log(req);
			axios
				.post(`http://localhost:8000/detours/`, req)
				.then((res) => {
					console.log(res);
					console.log(res.data);
					navigate('/list');
				})
				.catch((err) => console.error(err));
		}
	}

	render() {
		console.log('AddDetour: render');
		return (
			<div className="AddDetour">
				<h2>Add a new detour to your map!</h2>
				<form className="AddDetour-Form" onSubmit={this.submitForm}>
					<label>Name</label>
					<input className="AddDetour-FormField" type="text" name="name" onChange={this.handleDetourInput} />
					<label>Latitude</label>
					<input className="AddDetour-FormField" type="text" name="lat" onChange={this.handleDetourInput} />
					<label>Longitude</label>
					<input className="AddDetour-FormField" type="text" name="lng" onChange={this.handleDetourInput} />
					<label>Notes</label>
					<textarea rows={5} name="notes" onChange={this.handleDetourInput} />
					<input className="AddDetour-SubmitForm" type="submit" />
				</form>
			</div>
		);
	}
}

export default AddDetour;
