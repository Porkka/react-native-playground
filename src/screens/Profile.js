import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'

import { NavigationActions } from 'react-navigation'
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons'
import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const Main = ({ dispatch }) =>  {
  return (
    <View style={{ flex: 1 }}>
      <View style={[ styles.centering_container, { flex: 1 } ]}>
        <View style={[  styles.icon_btn , styles.centering_container, {  flex: 1, marginBottom: 20 } ]}>
          <MCIcons name="lead-pencil" size={55} color="#C7C7C7"></MCIcons>
        </View>
        <Text style={{ fontSize: 16 }}>UU YEAH, LET'S DO SOME SHEEAT!</Text>
      </View>
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

const styles = StyleSheet.create({

  centering_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon_btn: {
    width: 185,
    height: 185,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEDEDE',
  },

});

export default connect()(Main);