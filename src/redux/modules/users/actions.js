/**
*
* Actions 
*
* http://redux.js.org/docs/basics/Actions.html
*
* Actions are payloads of information that send data from your application to your store.
* They are the only source of information for the store. You send them to the store using store.dispatch().
*
*
* Actions are plain JavaScript objects. Actions must have a type property 
* that indicates the type of action being performed. Types should typically be defined as string constants. 
* Once your app is large enough, you may want to move them into a separate module.
*
* import { CREATE_USER, READ_USERS... } from './types'
* 
*/

export const LOGIN_USER = 'users/login';
export const LOGIN_SUCCESS = 'users/login_success';
export const CREATE_USER = 'users/create';
export const READ_USERS = 'users/read';
export const SUCCESS = 'users/success';
export const FAIL = 'users/fail';
export const UPDATE_USER = 'users/update';
export const DELETE_USER = 'users/delete';

/**
*
* Other than type, the structure of an action object is really up to you.
* If you're interested, check out Flux Standard Action for 
* recommendations on how actions could be constructed.
*
* ?? https://github.com/acdlite/flux-standard-action ??
* Andrew Clark - acdlite - Front-end engineer at Facebook. Co-creator of Redux. Creator of Recompose.
*
*/

export function createUser(user) {
  return {
    type: CREATE_USER,
    payload: user
  };
}
export function loginUser(user) {
  return {
    types: [ LOGIN_USER, LOGIN_SUCCESS, FAIL ],
    promise: {
      method: 'POST',
      url: 'http://192.168.11.2:3000/users',
      payload: user,
    }
  }
}
// You can call this from any reduxed component as this.props.goToComponent1(params)
export function readUsers() {
  
  return {
    types: [ READ_USERS, SUCCESS, FAIL ],
    promise: {
      method: 'GET',
      url: 'http://192.168.11.2:3000/users',
    }
  };
  // return {
  //   type: READ_USERS,
  //   payload: [
  //     {
  //       id: 1,
  //       first_name: 'John',
  //       last_name: 'Doe',
  //       email: 'john.doe@doers.do'
  //     }
  //   ]
  // };
}
export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}
export function deleteUser(user) {
  return {
    type: DELETE_USER,
    payload: user
  };
}