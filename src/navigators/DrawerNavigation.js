import { DrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile'

export default DrawerNavigator (
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
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