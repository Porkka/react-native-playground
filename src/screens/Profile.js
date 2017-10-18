import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { common_styles } from '../styles/global'

class Profile extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Profile',
      drawerIcon: ({ tint_color }) => ( <MCIcons name="account-circle" size={ 25 } color={ tint_color }></MCIcons> ),
      headerLeft: <TouchableOpacity onPress={ () => { navigation.navigate('DrawerOpen') } }>
        <MCIcons name="menu" size={ 35 } color="#555551" style={{ marginLeft: 10 }}></MCIcons>
      </TouchableOpacity>,
      headerRight: <TouchableOpacity onPress={ () => { navigation.navigate('Profile') } }>
        <MCIcons name="account-circle" size={ 35 } color="#555551" style={{ marginRight: 10 }}></MCIcons>
      </TouchableOpacity>
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[ { flex: 1 }, common_styles.centering_container ]}>
        <Text style={{ fontSize: 18 }}>Nothing here</Text>
      </View>
    );
  }

}

export default (Profile);