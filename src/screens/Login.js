import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, Alert, Vibration } from 'react-native';

import { connect } from 'react-redux';
import * as global_styles from '../styles/global';

import LoginForm from '../components/login/Form';
import SignUpForm from '../components/signup/Form';

import { loginUser } from '../redux/modules/users/actions'

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
      //this is a local notification
    }
    if(notif.opened_from_tray){
      //iOS: app is open/resumed because user clicked banner
      //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();
console.log(notif);
    _sendLocalNotification(notif.fcm);

    if(Platform.OS ==='ios'){
      //optional
      //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
      //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //notif._notificationType is available for iOS platfrom
      switch(notif._notificationType){
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    }
});

_sendLocalNotification = (notif) => {
  console.log('Sending the notification to notification bar.', notif);
  FCM.presentLocalNotification({
      title: notif.title,                     // as FCM payload
      body: notif.body,                    // as FCM payload (required)
      priority: "high",                                   // as FCM payload
      click_action: "ACTION",                             // as FCM payload
      auto_cancel: true,                                  // Android only (default true)
      vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
      lights: true,                                       // Android only, LED blinking (default false)
      show_in_foreground: true,                           // show notification when app is in foreground (local & remote)
      local: true                                  
    })
};

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

    // iOS: show permission prompt for the first call. later just check permission in user settings
    // Android: check permission in user settings
    FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
    
    FCM.getFCMToken().then(token => {
        console.log(token)
        // store fcm token in your server
    });

    
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        // optional, do some component related stuff
    });
    
    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then(notif=>{
       console.log(notif)
    });
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