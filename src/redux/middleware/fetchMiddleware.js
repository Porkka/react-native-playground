/**
*
* Middleware
*
* http://redux.js.org/docs/advanced/Middleware.html
*
* It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.
* People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
*
*
*/
export default function fetchMiddleware({ dispacth, getState }) {

	return next => action => {

		// Deconstruct the action
		const { promise, types, ...rest } = action;

		// If there is no promise key => continue app execution as normal.
		// console.log('fetchMiddleware: ', next, action);
		if(!promise) {
			return next(action);
		}
		// console.log('Got Promise in fetchMiddleware: ', promise, types, rest);

		// Layout the action types to dispacth accordingly, when the api call responses.
		const [ REQUEST, SUCCESS, FAILURE ] = types;

		// Request starting...
		next({ ...rest, type: REQUEST });

		console.log('Going to call ', promise.url, 'With parameters', promise);
		// Do the request
		actionPromise = fetch(promise.url, promise);
		actionPromise.then(response => {
    	return response.json();
    })
    .then(payload => {
    	return next({ ...rest, payload, type: SUCCESS });
    })
    .catch(e => {
    	console.log('API CALL PHAIL!! ', promise, e);
    	return next({ ...rest, payload, type: FAIL });
    });	

		return actionPromise;
	};

}