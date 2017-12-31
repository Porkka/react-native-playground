# react-native-playground
This repository is here for anyone who wants to start playing around with React Native. It's not a boilerplate nor a complete application, but a collection of litle examples structured as an project. This projects includes examples for simple elements such as inputs, divs and text elements. There's also examples for more complex plugins such as:

- React Native Camera
- Push Notifications with Google's Firebase
- Custom Fonts
- Font Icons
- Redux
- React Navigation
- React Native Simple Auth (Social media sign in)
- React Native Popup Menu
- React Native Simple Toast

**All of the plugins except push notifications and simple auth** should be working correctly after you have followed the instructions in the __First steps__- section. For these two, you need to jump some extra hoops in order for them to work. There is a separate sections for push notifications as well as simple auth. Please refer to each plugin's github page for complete guides.

### First steps
To start up this project, you should alredy have installed React Native. If not, checkout the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) for instructions. After that, you can continue here by cloning this repository and installing the components / plugins used in this project.
#### Cloning the project and installing the plugins
```
git clone https://github.com/thejebo/react-native-playground.git
cd react-native-playground
npm install
```
With that, the installation is complete. Next you need to create the ```.env``` (for the plugin ```react-native-dotenv```). The contents of ```.env``` file are listed below.
#### Link the plugins
Next thing to do is to link some of the plugins. Not all of the plugins used here require this. Then why do some of them need it? [There's an explanation for this in the React Native homepage](https://facebook.github.io/react-native/docs/linking-libraries-ios.html).
```
react-native link react-native-vector-icons
react-native link react-native-simple-toast
react-native link react-native-camera
```
#### Servers
##### JSON server
In order to store and fetch data, we install [JSON server](https://github.com/typicode/json-server) for quick "database". You can install the JSON server where ever you like. The JSON file (which the server requires to emulate database) is under ```./json-server```. **This is of course for testing purposes only. In real life you would connect to development or production database.**.
##### WebSocket server
The server is only here for the sole purpose of showcasing the web socket functionality of React Native. Again the server can be installed anywhere by
[Following the instructions at their github page](https://github.com/websockets/ws).  

### Run the project
Here we are only looking the Android side of things, So while in your project's root directory, run:
```
react-native run-android
```
Remember to start the android emulator or have a real device connected via usb cable.

### Can't run the project?
Be sure you have installed React Native correctly. https://facebook.github.io/react-native/docs/getting-started.html > Building Projects with Native Code

- Android Studio
- Correct packages from Android Studio: Appearance & Behavior → System Settings → Android SDK.
- Correctly setup variables (JAVA_HOME, ANDROID_HOME).
- Be sure that the ```./android``` folder has 0755 permissions.
- Check that you have all the listed environment variables in ```.env``` file.
- You need running API server ([JSON server](https://github.com/typicode/json-server) was used, while creating this project).
### React Native Dotenv
https://github.com/zetachang/react-native-dotenv
```
npm i react-native-dotenv --save-dev
```
Add the react-native-dotenv preset to ```.babelrc``` file at project root.
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
If you don't provide used environment variables, the app will crash. Used variables are listed below. **Callbacks, secrets and ids for social networks doesn't have to be correct for the app to run.**
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
### Animations
http://facebook.github.io/react-native/releases/next/docs/animations.html#animations  
Sliding and fading effect in FlatList items on component mount. Debugging remotely causes major fps drops while animating.
### Websockets
https://facebook.github.io/react-native/docs/network.html   
Small example in ```.src/screens/Messages```
### Push Notifications with Google's Firebase
##### Firebase
https://console.firebase.google.com
**For this to work, you need to create an project in Google's Firebase. Depending on which platform you develop for, from your new project you need to download ```google-services.json``` or ```GoogleService-Info.plist```. ```google-services.json``` is for Android and you need place it under ```./android/app/```. ```GoogleService-Info.plist``` is for iOS and you need to place it under ```./ios/your-project-name/```.**

With Firebase you can send messages to variety of platforms including Android and iOS. You can also send messages from your server to Firebase, which in turn delivers them to the targeted machine or group.
https://gist.github.com/thejebo/5dcb3fae795ed6d4b47a93540491e52a
##### React Native FCM
https://github.com/evollu/react-native-fcm
```
npm i react-native-fcm --save
react-native link react-native-fcm
```

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
Provides Google, Facebook, Twitter and Tumblr logins. Here we use only Google, Facebook and Twitter. In order for these to work correctly, you need to setup an account (or use your own) on each provider and access the developer console to create an app.
- https://console.cloud.google.com
- https://developers.facebook.com
- https://apps.twitter.com

The user data returned by the providers are not actualy stored anywhere. **For complete guide, visit the plugin's github page.** All the tokens and ids that you get, while creating the apps, are stored to ```.env`` file.  
### React Native Simple Toast
https://github.com/xgfe/react-native-simple-toast
```
npm i react-native-simple-toast --save
react-native link react-native-simple-toast
```
Used to make small notifications, such as saving or updating todo entry.
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
