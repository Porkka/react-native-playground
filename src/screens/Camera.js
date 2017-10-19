import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Vibration, Alert } from 'react-native'

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
    this.state = {
      scanning: true, // Set flag for barcode scanner. Otherwise it's called multiple times in a second.
    };
  }

  render() {
    return (
      <View style={[ { flex: 1 } ]}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this._readCode.bind(this)}
          style={styles.preview}
          aspect={RNCamera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </RNCamera>
      </View>
    );
  }

  _readCode(data) {
    if(!this.state.scanning) {
      return;
    }

    this.setState({ scanning: false });

    Vibration.vibrate();
    Alert.alert(
      "Got code", // Title
      (data.data + "\n" + "It's type is: " + data.type), // Text
      [
        {text: 'OK', onPress: () => { this.setState({  scanning: true }) } },
      ],
      { cancelable: false }
    )

    return;
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        Vibration.vibrate();
        Alert.alert(
          "Got image", // Title
          "mediaUri: " + data.mediaUri + "\nPath: " + data.path,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      })
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