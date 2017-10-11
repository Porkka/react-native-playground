import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'


import LoginScreen from '../screens/Login'
import ProfileScreen from '../screens/Profile'
import DrawerNavigation from './DrawerNavigation'
import EntrySaveScreen from '../screens/entries/Save'


export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: DrawerNavigation },
  EntrySave: { screen: EntrySaveScreen },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);