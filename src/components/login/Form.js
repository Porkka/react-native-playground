import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Image, Linking } from 'react-native';

import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';
import { google, facebook, twitter, tumblr } from 'react-native-simple-auth';

import styles from './Styles';
import CustomInput from '../utilities/CustomInput';

import { GOOGLE_APP_ID, GOOGLE_CALLBACK, FACEBOOK_APP_ID, FACEBOOK_CALLBACK, TWITTER_APP_ID, TWITTER_CALLBACK, TWITTER_APP_SECRET } from 'react-native-dotenv'
class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <EvilIcon name="envelope" size={50} color="#DEDEDE" style={{ borderRightWidth: 2, borderRightColor: '#F5F5F5', marginRight: 10 }} />
          </View>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Email"  keyboardType="email-address"/>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <EvilIcon name="lock" size={50} color="#DEDEDE" style={{ borderRightWidth: 2, borderRightColor: '#F5F5F5', marginRight: 10 }} />
          </View>
          <View style={{ flex: 6 }}>
            <CustomInput secureTextEntry={true} placeholder="Password" />
          </View>
        </View>
        <View style={ styles.btn_container }>
          <Button title="Login" onPress={() => this.props.navigation.dispatch({ type: 'Login' })}></Button>
        </View>
        <View style={{ marginTop: -14, height: 90, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>or</Text>
        </View>
        <View style={ styles.social_box }>
          <TouchableOpacity style={ [ styles.icon_btn, { backgroundColor: '#3B5998' } ] } onPress={ () => { this.facebookLogin() } }>
            <EvilIcon name="sc-facebook" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={ [ styles.icon_btn, { backgroundColor: '#00ACED' } ] } onPress={ () => { this.twitterLogin() } }>
            <EvilIcon name="sc-twitter" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={ [ styles.icon_btn, { backgroundColor: '#D62D20' } ] } onPress={ () => { this.googleLogin() } }>
            <EvilIcon name="sc-google-plus" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  normalLogin() {
    this.props.navigation.navigate('home');
  }

  // https://console.cloud.google.com
  googleLogin() {
    google({
      appId: GOOGLE_APP_ID,
      callback: GOOGLE_CALLBACK
    }).then((info) => {
      // info.user - user details from the provider
      console.log('Google login: ', info);
      // info.credentials - tokens from the provider
    }).catch((error) => {
      // error.code
      // error.description
      console.log('Google login: ', error);
    });
  }

  // https://developers.facebook.com
  facebookLogin() {
    facebook({
      appId: FACEBOOK_APP_ID,
      callback: FACEBOOK_CALLBACK,
      scope: 'user_friends', // you can override the default scope here
      fields: ['email', 'first_name', 'last_name'], // you can override the default fields here
    }).then((info) => {
      // info.user - user details from the provider
      console.log('Facebook login: ', info);
      // info.credentials - tokens from the provider
    }).catch((error) => {
      // error.code
      // error.description
      console.log('Facebook login: ', error);
    });
  }

  // https://apps.twitter.com
  twitterLogin() {
    twitter({
      appId: TWITTER_APP_ID,
      callback: TWITTER_CALLBACK,
      appSecret: TWITTER_APP_SECRET
    }).then((info) => {
      // info.user - user details from the provider
      console.log('Twitter login: ', info);
      // info.credentials - tokens from the provider
    }).catch((error) => {
      // error.code
      // error.description
      console.log('Twitter login: ', error);
    });
  }

}

export default Form;