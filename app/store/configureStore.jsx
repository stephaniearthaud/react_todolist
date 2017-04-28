import * as redux from 'redux';
import thunk from 'redux-thunk'

import {searchTextReducer, showCompletedReducer, todosReducer, authReducer} from 'reducers';

export var configure = (initialState = {}) => {
	var reducers = redux.combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer,
		auth: authReducer
	});

	var store = redux.createStore(reducers,initialState,redux.compose(redux.applyMiddleware(thunk)));

	return store;
}