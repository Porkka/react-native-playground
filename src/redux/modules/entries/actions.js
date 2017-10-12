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
* import { CREATE_ENTRY, READ_ENTRIES... } from './types'
* 
*/

export const CREATE_ENTRY = 'entries/create';
export const CREATE_SUCCESS = 'entries/create_success';
export const UPDATE_ENTRY = 'entries/update';
export const READ_ENTRIES = 'entries/read';
export const READ_SUCCESS = 'entries/read_success';
export const FAIL = 'entries/fail';
export const UPDATE_SUCCESS = 'entries/update_success';
export const DELETE_ENTRY = 'entries/delete';
export const DELETE_SUCCESS = 'entries/delete_success';

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
const base_url = 'http://192.168.11.2:3000/';

export function createEntry(entry) {
  return {
    types: [ CREATE_ENTRY, CREATE_SUCCESS, FAIL ],
    promise: {
      method: 'POST',
      url: base_url + 'post',
      payload: entry
    },
  };
}
export function readEntries() {
  return {
    types: [ READ_ENTRIES, READ_SUCCESS, FAIL ],
    promise: {
      method: 'GET',
      url: base_url + 'posts',
    }
  };
}
export function updateEntry(entry) {
  return {
    types: [ UPDATE_ENTRY, UPDATE_SUCCESS, FAIL ],
    promise: {
      method: 'PUT',
      url: base_url + 'post',
      payload: entry
    },
  };
}
export function deleteEntry(entry) {
  return {
    type: DELETE_ENTRY,
    payload: entry
  };
}