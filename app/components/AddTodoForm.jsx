var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions')

export var AddTodoForm = React.createClass({

	onSubmit: function(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		var todoText = this.refs.todoText.value;

		if (todoText.length > 0) {
			this.refs.todoText.value = '';
			dispatch(actions.startAddTodo(todoText));
		} else {
			this.refs.todoText.focus();
		}
	},	

	render: function() {
		return (
			<div className="container__footer">
				<form onSubmit={this.onSubmit}>
					<input type="text" placeholder="What do you need to do for today?" ref="todoText" />
					<button className="button expanded">Add Todo</button>
				</form>
			</div>
		);
	}
});

export default connect()(AddTodoForm);