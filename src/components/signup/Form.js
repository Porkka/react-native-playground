import React, { Component } from 'react';
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

import CustomInput from '../utilities/CustomInput'

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <EvilIcon name="pencil" size={50} color="#DEDEDE" style={{ borderRightWidth: 2, borderRightColor: '#F5F5F5', marginRight: 10 }} />
          </View>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="First name" onChangeText={ value => { this.setState({ first_name: value }) } }/>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <EvilIcon name="pencil" size={50} color="#DEDEDE" style={{ borderRightWidth: 2, borderRightColor: '#F5F5F5', marginRight: 10 }} />
          </View>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Last name" onChangeText={ value => { this.setState({ last_name: value }) } }/>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <EvilIcon name="envelope" size={50} color="#DEDEDE" style={{ borderRightWidth: 2, borderRightColor: '#F5F5F5', marginRight: 10 }} />
          </View>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Email" keyboardType="email-address" onChangeText={ value => { this.setState({ username: value }) } }/>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <EvilIcon name="lock" size={50} color="#DEDEDE" style={{ borderRightWidth: 2, borderRightColor: '#F5F5F5', marginRight: 10 }} />
          </View>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Password" secureTextEntry={true} onChangeText={ value => { this.setState({ password: value }) } }/>
          </View>
        </View>
        <View style={ styles.btn_container }>
          <Button title="Sign Up" onPress={ () => console.log(this.state) }></Button>
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
  btn_container: {
    marginVertical: 15
  },
  form_control: {
    height: 60,
    marginBottom: 20,
    borderBottomWidth: 3,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F5F5F5',
  }
})

export default Form;