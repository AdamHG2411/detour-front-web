import React, { Component } from 'react';
import './NewMap.css';

class NewMap extends Component {
	constructor(props) {
		super(props);
		this.detailMap = this.detailMap.bind(this);
		this.submitMap = this.submitMap.bind(this);
	}

	detailMap(evt) {
		evt.preventDefault();
		this.props.handleChange({
			name: evt.target.name,
			value: evt.target.value
		});
	}

	submitMap(evt) {
		evt.preventDefault();
		this.props.createMap();
	}

	render() {
		console.log('NewMap: render');
		return (
			<div className="NewMap">
				<div className="NewMap-Left">
					<h2>
						{this.props.newTitle} - {this.props.newCity}, {this.props.newCountry}
					</h2>
					<p>{this.props.newDescription}</p>
					<form className="NewMap-Form" onSubmit={this.submitMap}>
						<h3>New Map</h3>
						<label>Map Title</label>
						<input className="NewMap-FormField" type="text" name="newTitle" onChange={this.detailMap} />
						<label>City</label>
						<input className="NewMap-FormField" type="text" name="newCity" onChange={this.detailMap} />
						<label>Country</label>
						<input className="NewMap-FormField" type="text" name="newCountry" onChange={this.detailMap} />
						<label>Description</label>
						<textarea rows={5} name="newDescription" onChange={this.detailMap} />
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
