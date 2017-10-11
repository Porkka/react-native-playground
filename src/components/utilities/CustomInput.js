import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const active_boder_color = '#850EFF';
const default_boder_color = '#F5F5F5';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      borderBottomColor: default_boder_color
    };
  }

  onFocus() {
    this.setState({ borderBottomColor: active_boder_color });
  }
  onBlur() {
    this.setState({ borderBottomColor: default_boder_color });
  }

  render() {
    return (
      <TextInput
      {...this.props}
      placeholderTextColor="#A1A1A1"
      underlineColorAndroid='transparent'
      onFocus={ () => this.onFocus() }
      onBlur={ () => this.onBlur() }
      style={[ styles.form_control, { borderBottomColor: this.state.borderBottomColor} ]}
      >
      </TextInput>
    );
  }

}

const styles = StyleSheet.create({
  form_control: {
    height: 60,
    marginBottom: 20,
    borderBottomWidth: 3,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  }
})

export default Form;