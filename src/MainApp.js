import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, Alert } from 'react-native'
import { createStore, applyMiddleware } from 'redux'

import AppReducer from './redux'
import AppWithNavigationState from './navigators/AppNavigator'
import fetchMiddleware from './redux/middleware/fetchMiddleware'

console.ignoredYellowBox = [ 'Remote debugger' ];


export const App = () => (
  <MenuContext>
    <YourApp />
  </MenuContext>
);

class MainApp extends React.Component {

  store = createStore(AppReducer, applyMiddleware(fetchMiddleware));

  render() {

    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );

  }

}

export default MainApp;