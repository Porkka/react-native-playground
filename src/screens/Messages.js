import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Alert, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'

import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { common_styles } from '../styles/global'

import { main_color } from '../styles/global.js'

class Messages extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Messages',
      drawerIcon: ({ tint_color }) => ( <MCIcons name="comment-multiple-outline" size={ 25 } color={ tint_color }></MCIcons> ),
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
    this.state = { 
      text: '',
      history: [ ],
    }; 
  }

  componentWillMount() { 
    this.ws = new WebSocket('ws://192.168.11.2:3001'); 

    this.ws.onopen = this._onOpenConnection; 
    this.ws.onmessage = this._onMessageReceived; 
    this.ws.onerror = this._onError; 
    this.ws.onclose = this._onClose; 

  } 

  render() { 
    const { history, text } = this.state; 

    return ( 
      <View style={styles.container}> 
        <Text style={styles.toolbar}>WebSocket Example</Text> 
        <ScrollView style={styles.content}> 
          { history.map(this.renderMessage) } 
        </ScrollView> 
        <View style={styles.inputContainer}> 
          <TextInput 
            style={styles.input} 
            value={text} 
            onChangeText={(text) => this._onChangeText(text)} 
            onSubmitEditing={this._onSendMessage} 
          /> 
        </View> 
      </View> 
    ); 
  }

  renderMessage(item, index){ 
    const kind = item.owner ? styles.me : styles.friend; 

    return ( 
      <View style={[styles.msg, kind, styles.list_item ]} key={index}> 
        <Text>{item.msg}</Text> 
      </View> 
    ); 
  } 

  _onOpenConnection = () => { 
    console.log('Open!'); 
  } 

  _onError = (event) => { 
    Alert.alert('Error', 'Not connected');
    console.log('onerror', event.message); 
  } 

  _onClose = (event) => { 
    console.log('onclose', event.code, event.reason); 
  }

  _onMessageReceived = (event) => { 
    this.setState({ 
      history: [ 
        ...this.state.history, 
        { owner: false, msg: event.data }, 
      ], 
    }); 
  }

  _onSendMessage = () => { 
    const { text } = this.state; 
    this.setState({ 
      text: '', 
      history: [ 
        ...this.state.history, 
        { owner: true, msg: text }, 
      ], 
    }); 
    this.ws.send(text); 
  }

  _onChangeText(text) { 
    this.setState({ text }); 
  }

}

const styles = StyleSheet.create({ 
  container: { 
    backgroundColor: '#ecf0f1', 
    flex: 1, 
  }, 
  toolbar: { 
    backgroundColor: main_color, 
    color: '#fff', 
    fontSize: 20, 
    padding: 25, 
    textAlign: 'center', 
  }, 
  content: { 
    flex: 1, 
  }, 
  inputContainer: { 
    backgroundColor: '#bdc3c7', 
    padding: 5, 
  }, 
  input: { 
    height: 40, 
    backgroundColor: '#fff', 
  },
  list_item: {
    opacity: 1,
    marginBottom: 3,
    paddingVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },

  list_item_btn: {
    flex: 12,
    justifyContent: 'center'
  },

  list_item_txt: {
    fontSize: 14,
  },
});

export default (Messages);