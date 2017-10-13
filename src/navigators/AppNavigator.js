import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NetInfo } from 'react-native'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'



import { setConnectivity } from '../redux/modules/network/actions'

import LoginScreen from '../screens/Login'
import ProfileScreen from '../screens/Profile'
import DrawerNavigation from './DrawerNavigation'
import EntrySaveScreen from '../screens/entries/Save'

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: DrawerNavigation },
  EntrySave: { screen: EntrySaveScreen },
});


class AppWithNavigationState extends Component {
	
	componentWillMount = () => {
		console.log('AppWithNavigationState mounted!');
		NetInfo.isConnected.addEventListener(
		  'connectionChange',
		  this.onConnectivityChange
		);
	}
	componentWillUnMount = () => {
		console.log('AppWithNavigationState UnMounted!');
		NetInfo.isConnected.removeEventListener(
		  'connectionChange',
		  this.onConnectivityChange
		);
	}
	onConnectivityChange = (connected) => {
		console.log('Change!', connected);
		this.props.dispatch(setConnectivity(connected))
	}

	render() {
		const dispatch = this.props.dispatch;
		const nav = this.props.nav;
		return (
  		<AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
		)
	}

}
AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);