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

		const { promise, types, ...rest } = action;

		// console.log('fetchMiddleware: ', next, action, promise, types, rest );
		if(!promise) {
			return next(action);
		}
		//		console.log('fetchMiddleware: ', promise, types, rest);

		const [ REQUEST, SUCCESS, FAILURE ] = types;

		// Request starting
		next({ ...rest, type: REQUEST });

		actionPromise = fetch(promise.url, promise);
		actionPromise.then(function(response) {
        return response.json();
    })
    .then(function(payload) {
    	return next({ ...rest, payload, type: SUCCESS });
    })
    .catch(function(e) {
    	console.log('FETCH PHAIL!! ', e);
    	return next({ ...rest, payload, type: FAIL });
    });	

		return actionPromise;
	};

}