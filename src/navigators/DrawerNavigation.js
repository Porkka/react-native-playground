import { DrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/Home'
import CameraScreen from '../screens/Camera'
import ProfileScreen from '../screens/Profile'
import MessageScreen from '../screens/Messages'

export default DrawerNavigator (
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Camera: {
      screen: CameraScreen,
    },
    Messages: {
      screen: MessageScreen,
    }
  }, {
     drawerWidth: 260,
     drawerPosition: 'left',
     contentOptions: {
       activeTintColor: '#FFFFFF',
       activeBackgroundColor: '#BE7EFF',
    },
  }
);