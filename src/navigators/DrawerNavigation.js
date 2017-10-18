import { DrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/Home'
import CameraScreen from '../screens/Camera'
import ProfileScreen from '../screens/Profile'

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
    }
  }, {
     drawerWidth: 300,
     drawerPosition: 'left',
     contentOptions: {
       activeTintColor: '#FFFFFF',
       activeBackgroundColor: '#BE7EFF',
    },
  }
);