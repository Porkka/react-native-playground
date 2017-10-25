# react-native-playground
Testing React Native

For testing purposes WebSocket server and JSON server were installed.  
https://github.com/websockets/ws  
https://github.com/typicode/json-server

### Can't run the project?
Be sure to have react-native installed correctly   
https://facebook.github.io/react-native/docs/getting-started.html > Building Projects with Native Code   

- Android Studio
- Correct packages from Android Studio: Appearance & Behavior → System Settings → Android SDK.
- Correctly setup variables (JAVA_HOME, ANDROID_HOME).
- Be sure that the ```./android``` folder has 0755 permissions.
- You need running API server. Use provided at ```./js-server/react-test.json``` or create your own.
### React Native Dotenv
https://github.com/zetachang/react-native-dotenv
```
npm i react-native-dotenv --save-dev
```
Add the react-native-dotenv preset to your .babelrc file at the project root.
```
{
  "presets": ["react-native", "react-native-dotenv"]
}
```
Here used to store social app ids and secrets. Also API's base url is kept in .env.  
When editing .env, you need to restart the packager and clear it's cache.
```
npm start -- --reset-cache
```
##### ./.env file contents
If you don't provide used environment variables, the app will crash. Used variables are listed below. Callbacks, secrets and ids for social networks doesn't have to be correct for the app to run.
```
API_URL=http://192.xxx.xx.x:3000   

GOOGLE_CALLBACK=1234567
GOOGLE_APP_ID=1234567   
    
FACEBOOK_APP_ID=1234567
FACEBOOK_CALLBACK=1234567   
   
TWITTER_APP_SECRET=1234567    
TWITTER_APP_ID=1234567    
TWITTER_CALLBACK=1234567     
```
### Topics still to explore
- Writing Native Modules
### Animations
http://facebook.github.io/react-native/releases/next/docs/animations.html#animations  
Sliding and fading effect in FlatList items on component mount. Debugging remotely causes major fps drops while animating.
### Websockets
https://facebook.github.io/react-native/docs/network.html   
Small example in ```.src/screens/Messages```
### Push Notifications
##### Firebase
https://console.firebase.google.com  
With Firebase you can send messages to variety of platforms including Android and iOS.  
You can also send messages from your server to Firebase, which in turn delivers them to the targeted machine or group.  
https://gist.github.com/Porkka/5dcb3fae795ed6d4b47a93540491e52a
##### React Native FCM
https://github.com/evollu/react-native-fcm
```
npm i react-native-fcm --save
react-native link react-native-fcm
```
### Writing Native Modules
TODO
### Redux
http://redux.js.org/  
https://github.com/reactjs/redux  
```
npm i --save redux
npm i --save react-redux
```
### Custom Fonts
https://fonts.google.com/  
In this project, we are using Roboto from Google Fonts.   
When importing files to workspace:
- The name should be lowercase.
- There shouldn't be any spaces in the name.
- Use an underscore to define the style, for example, roboto_bold.
### Font Icons
https://github.com/oblador/react-native-vector-icons
```
npm i --save react-native-vector-icons
react-native link react-native-vector-icons
```
Here we are using just the MaterialCommunityIcons.  
https://materialdesignicons.com/
### React Navigation
https://reactnavigation.org/  
https://github.com/react-community/react-navigation  
https://github.com/react-community/react-navigation/tree/master/examples  
```
npm i --save react-navigation
```
There's Stack- and Drawernavigation.
### React Native Popup Menu
https://github.com/instea/react-native-popup-menu
```
npm i --save react-native-popup-menu
```
Todo entry ```src/components/todo/Item``` has example of this.
### React Native Simple Auth
https://github.com/adamjmcgrath/react-native-simple-auth  
```
npm i react-native-simple-auth --save
```
Provides Google, Facebook, Twitter and Tumblr logins. Here we use only Google, Facebook and Twitter. The 'login', doesn't actualy store the user data.
- https://console.cloud.google.com
- https://developers.facebook.com
- https://apps.twitter.com
### React Native Simple Toast
https://github.com/xgfe/react-native-simple-toast
```
npm i react-native-simple-toast --save
react-native link react-native-simple-toast
```
Used to make small notifications, such as saving new or updating todo entry. 
### React Native Camera
https://github.com/lwansbrough/react-native-camera
```
npm i react-native-camera@https://github.com/lwansbrough/react-native-camera.git --save
react-native link react-native-camera
```
### Network Connectivity Status
https://facebook.github.io/react-native/docs/netinfo.html
Alert user, if the device's connection is lost.
### AsyncStorage
https://facebook.github.io/react-native/docs/asyncstorage.html
Saving data localy. Useful when network connection is lost. not thoroughly implemented here, but you can view it at ```src/components/todo/Form```.
### Runing On Device
https://facebook.github.io/react-native/docs/running-on-device.html  	
Method 1: Using adb reverse (recommended)  
Common ADB location on windows:
```
C:\Users\JohnDoe\AppData\Local\Android\sdk1\platform-tools
```
