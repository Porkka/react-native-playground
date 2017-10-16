import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'

import { styles_common } from '../styles/global'

import { NavigationActions } from 'react-navigation'
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons'
import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const Main = ({ dispatch }) =>  {
  return (
    <View style={[ { flex: 1 }, styles_common.centering_container ]}>
      <Text>Nothing here</Text>
    </View>
  );
}

Main.navigationOptions = ({ navigation }) => ({
  drawerLabel: 'Profile',
  drawerIcon: ({ tintColor }) => ( <MCIcons name="account-circle" size={25} color={tintColor}></MCIcons> ),
  headerLeft: <TouchableOpacity onPress={ () => { navigation.navigate('DrawerOpen') } }>
    <MCIcons name="menu" size={35} color="#555551" style={{ marginLeft: 10 }}></MCIcons>
  </TouchableOpacity>,
  headerRight: <TouchableOpacity onPress={ () => { navigation.navigate('Profile') } }>
    <MCIcons name="account-circle" size={35} color="#555551" style={{ marginRight: 10 }}></MCIcons>
  </TouchableOpacity>
});

Main.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Main);