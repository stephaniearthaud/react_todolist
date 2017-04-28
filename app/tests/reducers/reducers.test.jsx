var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {

	describe('searchTextReducer', () => {
		it('should set searchText', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'dog'
			}

			var res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.searchText);

		});
	});

	describe('showCompletedReducer', () => {
		it('should toggle show completed', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED',
			}

			var res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toEqual(true);
		});
	});

	describe('todosReducer', () => {
		it('should add new todo', () => {
			var action = {
				type: 'ADD_TODO',
				todo: {
					id: 'abc123',
					text: 'Something to do',
					completed: false,
					createdAt: 9929343
				}
			};

			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.todo);
		});

		it('should update completed and completedAt attr', () => {
			var todos = [
				{
					id: 1,
					text: 'Walk the dog',
					completed: true,
					completedAt: 12341
				},
				{
					id: 2,
					text: 'Beat the dog',
					completed: false,
					completedAt: undefined
				},
				{
					id: 3,
					text: 'Kill the dog',
					completed: false,
					completedAt: undefined
				}
			]
			var updates = {
				completed: false,
				completedAt: null
			};

			var action = {
				type: 'UPDATE_TODO',
				id: todos[0].id,
				updates
			}

			var res = reducers.todosReducer(df(todos), df(action));

			expect(res[0].completed).toEqual(updates.completed);
			expect(res[0].completedAt).toEqual(updates.completedAt);
			expect(res[0].text).toEqual(todos[0].text);

		});

		it('should add existing todos', () => {
			var todos = [
				{
					id: 111,
					text: 'anthing',
					completed: false,
					createdAt: undefined,
					createdAt: 33000
				}
			]

			var action = {
				type: 'ADD_TODOS',
				todos
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);

		});

		it('should remove todos upon logout', () => {
			var todos = [
				{
					id: 111,
					text: 'anthing',
					completed: false,
					createdAt: undefined,
					createdAt: 33000
				}
			];

			var action = {
				type: 'LOGOUT'
			}

			var res = reducers.todosReducer(df(todos), df(action));

			expect(res.length).toEqual(0);
		});

	});

	describe('authReducer', () => {

		it('should add user id to auth', () => {

			var uid = '12312asdasd';

			var action = {
				type: 'LOGIN',
				user: {
					uid,
					isAnonymous: true
				}
			};

			var res = reducers.authReducer(undefined, df(action));
			expect(res.uid).toEqual(uid);

		});

		it('should remove user id from auth', () => {

			var prevState = {uid:'123123dfsa', anon: true};

			var action = {
				type: 'LOGOUT'
			};

			var res = reducers.authReducer(df(prevState), df(action));
			expect(res).toEqual({});
		})

	});



});