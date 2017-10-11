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
	CREATE_ENTRY,
	READ_ENTRIES,
	READ_SUCCESS,
	FAIL,
	UPDATE_ENTRY,
	DELETE_ENTRY
} from './actions'; // from ./types


const initial_state = {
	entries: [ ],
	loading: false
};

export default function reducer(state = initial_state, action) {
console.log(action);
	switch (action.type) {
		case CREATE_ENTRY:
			return {
				...state,
				entries: [ ...state.entries, action.payload ]
			};
		case READ_ENTRIES:
			return {
				...state,
				loading: false
			};
		case READ_SUCCESS:
			return {
				...state,
				entries: [ ...action.payload ]
			};
		case FAIL:
			console.log('Something failed during entry action', action);
			return {
				...state,
				loading: false
			};
		case UPDATE_ENTRY:
			return {
				...state,
				entries: state.entries.map( user => {
					if(user.id === action.payload.id) {
						return { ...action.payload };
					}
					return user;
				})
			};
		case DELETE_ENTRY:
			return {
				...state,
				entries: state.entries.filter( user => user.id !== action.payload.id )
			};
		default:
			return state;
	}

}