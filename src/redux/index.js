import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigators/AppNavigator'

import entries from './modules/entries/reducer';

const initial_nav_state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

function nav(state = initial_nav_state, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav, auth, entries
});

export default AppReducer;