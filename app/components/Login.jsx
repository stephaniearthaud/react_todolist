import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({

	onLogin() {
		var {dispatch} = this.props;
		dispatch(actions.startLogin());
	},

	onGuestLogin() {
		var {dispatch} = this.props;
		dispatch(actions.startLogin('guest'));
	},

	render() {
		return (
			<div>
				<h1 className="page-title">ToDo for Today</h1>

				<div className="row">
					<div className="columns small-centered small-10 medium-6 large-4">
						<div className="callout callout-auth">
							<h3>Welcome</h3>
							<button className="button" onClick={this.onGuestLogin} >Start ToDo List</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default Redux.connect()(Login);
