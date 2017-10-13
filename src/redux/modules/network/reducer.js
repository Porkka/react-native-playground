import { NETWORK_CHANGE } from './actions'

const initial_state = {
	isOnline: null,
	isOffline: null
};

export default function reducer(state = initial_state, action) {
	switch(action.type) {
		case NETWORK_CHANGE:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}