import firebase, {firebaseRef, githubProvider} from 'app/firebase';

import moment from 'moment';

export var setSearchText = (searchText) => {
	return {
		type: 'SET_SEARCH_TEXT',
		searchText
	};
};

export var addTodo = (todo) => {
	return {
		type: 'ADD_TODO',
		todo
	};
};

export var startAddTodos = () => {

	return (dispatch, getState) => {
		var uid = getState().auth.uid;
		var todosRef = firebaseRef.child(`users/${uid}/todos`);
		return todosRef.once('value').then((snapshot) => {
			var todos = snapshot.val() || {}
			var parsedTodos = Object.keys(todos).map((key) => {
				var id = key
				var values = snapshot.val()[id]
				return {id, ...values}
			});
			dispatch(addTodos(parsedTodos));
		});

	}
	
};


export var startAddTodo = (text) => {
	return (dispatch, getState) => {
		var todo = 	{
				text,
				completed: false,
				createdAt: moment().unix(),
				completedAt: null
		};
		var uid = getState().auth.uid;
		var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo)

		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id: todoRef.key
			}));
		});

	};
};

export var toggleShowCompleted = () => {
	return {
		type: 'TOGGLE_SHOW_COMPLETED',
	};
};

export var updateTodo = (id, updates) => {
	return {
		type: 'UPDATE_TODO',
		id,
		updates
	}
};

export var addTodos = (todos) => {
	return {
		type: 'ADD_TODOS',
		todos
	};
};

export var startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		var uid = getState().auth.uid;
		var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
		var updates = {
			completed,
			completedAt: completed ? moment().unix() : null
		}

		return todoRef.update(updates).then(() => {
			dispatch(updateTodo(id, updates));
		});
	};
};

export var startLogin = (guest) => {
	return (dispatch, getState) => {

		if (guest) {

			return firebase.auth().signInAnonymously().then((result) => {
				console.log('Auth worked');
			}, (e) => {
				console.log('Unable to auth', e);
			});

		} else {
			return firebase.auth().signInWithPopup(githubProvider).then((result) => {
				console.log('Auth worked');
			}, (e) => {
				console.log('Unable to auth', e);
			});

		}
	};
};

export var login = ({uid, isAnonymous}) => {
	return {
		type: 'LOGIN',
		user: {
			uid,
			isAnonymous
		}
	};
}

export var startLogout = () => {
	return (dispatch, getState) => {

		var user = getState().auth

		if (user.anon) {
			firebaseRef.child(`users/${user.uid}/todos`).remove()
		}

		return firebase.auth().signOut().then(() => {

			dispatch(logout());
		});
	};
};

export var logout = () => {
	return {
		type: 'LOGOUT'
	};
}
