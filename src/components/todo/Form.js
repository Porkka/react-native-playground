import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TextInput, Picker, Alert, AsyncStorage } from 'react-native'

import Toast from 'react-native-simple-toast';
import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import CustomInput from '../utilities/CustomInput'
import { readEntries, createEntry, updateEntry } from '../../redux/modules/entries/actions'


/**
* TODO: 
* CustomTextArea
*/

const key = '@MyApp:key';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entry: {
        id: 0,
        parent_id: 0,
        name: '',
        description: '',
      },
      entries: [],
    };
  }

  componentWillMount() {
    if(this.props.navigation.state.params) {
      if(this.props.navigation.state.params.entry) {
        console.log('Setting entry ', this.props.navigation.state.params.entry);
        this.setState({ entry: this.props.navigation.state.params.entry });
      }
    }
  }

  componentWillReceiveProps(next_props) {

  }

  getItems() {
    return this.state.entries.map((entry) => {
      return <Picker.Item label={ entry.name } key={ entry.id } value={ entry.id } />
    });
  }

  render() {
    this.getItems();
    return (
      <View>
        <View style={ styles.input_group }>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Name" 
            value={ this.state.entry.name }
            onChangeText={ value => { this.setState({ entry: { ...this.state.entry, name: value } }) } }/>
          </View>
        </View>

        <View style={ styles.input_group }>
          <View style={{ flex: 6 }}>
            <CustomInput placeholder="Description" 
            multiline={true} 
            value={ this.state.entry.description }
            onChangeText={ value => { this.setState({ entry: { ...this.state.entry, description: value } }) } }/>
          </View>
        </View>

        <Picker style={ styles.controlWidth }  
          selectedValue={ this.state.entry.parent_id }  
          onValueChange={ value => { this.setState({ entry: { ...this.state.entry, parent_id: value } }) } }
        >
          <Picker.Item label="No Parent" value="0" />
            { this.getItems() }
          </Picker>

        <View style={ styles.btn_container }>
          <Button title="Save" onPress={ () => this.saveEntry() }></Button>
        </View>
      </View>
    );
  }

  localSave = async () => { 
    try { 
      await AsyncStorage.setItem(key, this.state.entry); 
      Alert.alert('Saved', 'Successfully saved on device'); 
    } catch (error) { 
      Alert.alert('Error', 'There was an error while saving the data'); 
    } 
  }

  saveEntry() {
    Alert.alert('Is online?', (this.props.is_online) ? 'y': 'n');
    if(!this.props.is_online) {
      this.localSave();
      return;
    }
    if(!this.state.entry.id) {
      this.props.dispatch(createEntry(this.state.entry)).then(( response ) => this.handleResponse(response));
    } else {
      this.props.dispatch(updateEntry(this.state.entry)).then(( response ) => this.handleResponse(response));
    }

  }

  handleResponse(response) {
    if(response.status != 203) {
      Toast.show("Couldn't save entry. Please try again at a later time.");
    } else {
      this.props.navigation.navigate('Home');
    }
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


const map_state_props = (state) => {
  return {
    entries: state.entries,
    is_online: state.network.isOnline
  }
};

export default connect(map_state_props)(Form);