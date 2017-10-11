import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Text, Button, TouchableOpacity } from 'react-native';

import LoginForm from '../components/login/Form';
import SignUpForm from '../components/signup/Form';

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

  render() {
    let navigation = this.props.navigation;
    let content = this.state.active_screen == 'login' ? <LoginForm navigation={navigation}/> : <SignUpForm navigation={navigation}/>;
    let login_caret = this.state.active_screen == 'login' ? <View style={ styles.caret_up }></View> : null;
    let sign_up_caret = this.state.active_screen == 'sign_up' ? <View style={ styles.caret_up }></View> : null;
    return (
      <KeyboardAvoidingView style={styles.container}>

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

      </KeyboardAvoidingView>
    );
  }

}

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
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#850EFF'
  },


  content: {
    flex: 14,
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: '#FFFFFF'
  },


  footer: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: '#850EFF',
    backgroundColor: '#850EFF',
  }

});
export default Login;