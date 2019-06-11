import React, { Component } from 'react';
import './NewMap.css';

class NewMap extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			title: 'Title',
			city: 'City',
			country: 'Country',
			description: 'Description'
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(evt) {
		evt.preventDefault();
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	render() {
		return (
			<div className="NewMap">
				<div className="NewMap-Left">
					<h2>
						{this.state.title} - {this.state.city}, {this.state.country}
					</h2>
					<p>{this.state.description}</p>
					<form className="NewMap-Form">
						<h3>New Map</h3>
						<label>Map Title</label>
						<input className="NewMap-FormField" type="text" name="title" onChange={this.handleChange} />
						<label>City</label>
						<input className="NewMap-FormField" type="text" name="city" onChange={this.handleChange} />
						<label>Country</label>
						<input className="NewMap-FormField" type="text" name="country" onChange={this.handleChange} />
						<label>Description</label>
						<textarea rows={5} name="description" onChange={this.handleChange} />
						<input className="NewMap-SubmitForm" type="submit" />
					</form>
				</div>
				<div className="NewMap-Right">
					<h2>Let's Build a Map!</h2>
					<div>
						<p>
							<strong>Know the best spots in your hometown?</strong>
						</p>
						<p>
							<strong>Keeping track of your travel highlights?</strong>
						</p>
						<p>
							<strong>Guiding visitors to tourist destinations?</strong>
						</p>
					</div>

					<p>
						Just fill out the form to the left to start designing a custom map for your own reference or to
						share with others. You can add points of interest or "detours", including photos and notes, once
						the map is created.
					</p>
				</div>
			</div>
		);
	}
}

export default NewMap;
