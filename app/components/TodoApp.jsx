import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList';
import AddTodoForm from 'AddTodoForm';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export var TodoApp = React.createClass({
	onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;

		dispatch(actions.startLogout());
	},

	renderGuest() {

		var {anon} = this.props.auth

		if (anon) {
			return <p>Bye Bye!</p>
		}
	},

	render() {
		return (
			<div>
				<div className="page-actions">
					<a href="#" onClick={this.onLogout}>Logout</a>
				</div>
				<h1 className="page-title">Todo App</h1>

				<div className="row">
					<div className="column small-centered small-11 medium-6 large 5">
						<div className="container">
							<TodoSearch />
							<TodoList />
							<AddTodoForm />
						</div>
						{this.renderGuest()}
					</div>
				</div>
			</div>
		);
	}
});

export default Redux.connect((state) => state)(TodoApp);
