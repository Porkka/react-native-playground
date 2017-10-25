import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, Alert, Vibration } from 'react-native';

import { connect } from 'react-redux';
import * as global_styles from '../styles/global';

import LoginForm from '../components/login/Form';
import SignUpForm from '../components/signup/Form';

import { loginUser } from '../redux/modules/users/actions'

import { checkPermissions } from '../redux/modules/push_notifications';

class Login extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      active_screen: 'login'
    }
  }

  componentDidMount() {
    checkPermissions();
  }


  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this._checkNetworkStatus();
  }

  _checkNetworkStatus() { // Refactor to network status component
    if(!this.props.isOnline) {
      Vibration.vibrate();
      // Works on both iOS and Android
      Alert.alert(
        "Offline",
        "You don't have internet connection",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  _handleLogin(user) {
    this.props.dispatch(loginUser(user)).then(( response ) => this.handleLoginResponse(response));
  }
  handleLoginResponse(response) {
    console.log('Handling login response: ', response);
    this.props.navigation.navigate('Main');
  }

  render() {

    let content = this.state.active_screen == 'login' ? <LoginForm handleLogin={() => this._handleLogin() }/> : <SignUpForm handleLogin={() => this._handleLogin() }/>;
    let login_caret = this.state.active_screen == 'login' ? <View style={ styles.caret_up }></View> : null;
    let sign_up_caret = this.state.active_screen == 'sign_up' ? <View style={ styles.caret_up }></View> : null;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={ styles.h1 }>Do some work!</Text>
          <Text style={ styles.h1_small }>Lorem ipsum dolor sit amet</Text>
          <View style={ styles.b_tab_nav }>
            <TouchableOpacity style={ styles.fancy_btn } onPress={ () => this.setState({ active_screen: 'login' }) }>
              <Text style={ styles.fancy_btn_txt }>Login</Text>
              {login_caret}
            </TouchableOpacity>
            <TouchableOpacity style={ styles.fancy_btn } onPress={ () => this.setState({ active_screen: 'sign_up' }) }>
              <Text style={ styles.fancy_btn_txt }>Sign Up</Text>
              {sign_up_caret}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {content}
        </View>

        <View style={styles.footer}>
        </View>
      </View>
    );
  }

}

const map_state_to_props = (state) => {
  return {
    isOnline: state.network.isOnline
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  h1: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'notoserif'
  },
  h1_small: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'notoserif'
  },

  b_tab_nav: {
    flex: 1,
    bottom: 0,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  fancy_btn: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fancy_btn_txt: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  caret_up: {
    width: 0,
    height: 0,
    bottom: 0,
    position: 'absolute',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#FFFFFF',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },


  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: global_styles.main_color
  },


  content: {
    flex: 2,
    paddingVertical: 20,
    borderBottomWidth: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderColor: global_styles.main_color,
  },

});
export default connect(map_state_to_props)(Login);