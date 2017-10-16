/**
*
* Reducers
*
* http://redux.js.org/docs/basics/Reducers.html
*
* Actions describe the fact that something happened, but don't specify 
* how the application's state changes in response. This is the job of reducers.
*
* The reducer is a pure function that takes the previous state and an action, and returns the next state.
* '' (previousState, action) => newState ''
*
* Things you should never do inside a reducer:
*
*  - Mutate its arguments;
*  - Perform side effects like API calls and routing transitions;
*  - Call non-pure functions, e.g. Date.now() or Math.random().
*
*/
import {
	CREATE_USER,
	LOGIN_USER,
	READ_USERS,
	SUCCESS,
	FAIL,
	UPDATE_USER,
	DELETE_USER
} from './actions'; // from ./types


const initial_state = {
	users: [ ],
	refreshing: false
};

export default function reducer(state = initial_state, action) {

	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				users: [ ...state.users, action.payload ]
			};
		case READ_USERS:
			return {
				...state,
				refreshing: false
			};
		case SUCCESS:
			return {
				...state,
				users: [ ...action.payload ]
			};
		case FAIL:
			return {
				...state,
				refreshing: false
			};
		case UPDATE_USER:
			return {
				...state,
				users: state.users.map( user => {
					if(user.id === action.payload.id) {
						return { ...action.payload };
					}
					return user;
				})
			};
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter( user => user.id !== action.payload.id )
			};
		default:
			return state;
	}

}