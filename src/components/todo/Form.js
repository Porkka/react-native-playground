import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import CustomInput from '../utilities/CustomInput'

/**
* TODO: 
* CustomTextArea
*/

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entry: {
        id: null,
        parent_id: 0,
        name: '',
        description: '',
      }
    };
  }

  render() {
    return (
      <View>

        <View style={ styles.input_group }>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Name" onChangeText={ value => { this.setState({ name: value }) } }/>
          </View>
        </View>

        <View style={ styles.input_group }>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Description" multiline={true} onChangeText={ value => { this.setState({ description: value }) } }/>
          </View>
        </View>
        <View style={ styles.btn_container }>
          <Button title="Save" onPress={ () => console.log(this.state) }></Button>
        </View>
      </View>
    );
  }

  login() {
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centering_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  input_group: {
    flexDirection: 'row'
  },
  input_group_addon: {
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: '#F5F5F5'
  },
  btn_container: {
    marginVertical: 15
  }
})

export default Form;