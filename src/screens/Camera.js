import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import RNCamera from 'react-native-camera'
import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { common_styles } from '../styles/global'

class Camera extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      drawerLabel: 'Camera',
      drawerIcon: ({ tint_color }) => ( <MCIcons name="camera" size={ 25 } color={ tint_color }></MCIcons> ),
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[ { flex: 1 } ]}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={RNCamera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </RNCamera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default (Camera);