import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native'

import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import TodoList from '../components/todo/List'
import { readEntries, deleteEntry } from '../redux/modules/entries/actions'

class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => ( <MCIcons name="home" size={25} color={tintColor}></MCIcons> ),
      headerLeft: <TouchableOpacity onPress={ () => { navigation.navigate('DrawerOpen') } }>
        <MCIcons name="menu" size={35} color="#555551" style={{ marginLeft: 10 }}></MCIcons>
      </TouchableOpacity>,
      headerRight: <TouchableOpacity onPress={ () => { navigation.navigate('Profile') } }>
        <MCIcons name="account-circle" size={35} color="#555551" style={{ marginRight: 10 }}></MCIcons>
      </TouchableOpacity>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      entries: [ ],
      refreshing: false
    }
  }

  componentWillMount() {
    this.props.dispatch(readEntries());
  }

  componentWillReceiveProps(next_props) {
    if(this.props.entries !== next_props.entries) {
      this.setState({
        entries: next_props.entries.entries
      });
    }
  }

  // Pulling 
  _handleListRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(readEntries());
    this.setState({refreshing: false});
  }

  _handleItemPress(item) { /* example on press event on rendered item. Could be call straight to navigation. */
    this.props.navigation.navigate('EntrySave', { entry: item, title: 'Update entry - ' + item.name })
  }

  _handleItemDelete() {
    Alert.alert(
      'Are you sure?',
      'You want to delete this entry?',
      [
        {text: 'Cancel', onPress: () => {  } },
        {text: 'OK', onPress: () => this.props.dispatch(deleteEntry()) },
      ],
      { cancelable: false }
    )
  }

  render() {
    if(!this.state.entries.length) {
      var content = (
        <View style={[ styles.centering_container, { flex: 1 } ]}>
          <MCIcons name="inbox" size={105} color="#C7C7C7" style={{ marginBottom: 5 }}></MCIcons>
          <Text style={{ fontSize: 18 }}>All done!</Text>
        </View>
      );
    } else {
      var content = (
        <TodoList 
         data_source={ this.state.entries } 
         handleListRefresh={ () => this._handleListRefresh() } 
         handleItemPress={ (item) => this._handleItemPress(item) } 
         handleItemDelete={ (item) => this._handleItemDelete(item) } 
         refreshing={ this.state.refreshing } />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {content}
        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity style={[ styles.centering_container, styles.icon_btn, { right: 0, bottom: 0, position: 'absolute', } ]} 
          onPress={ () => this.props.navigation.navigate('EntrySave', { title: 'Add entry to Todo list'}) }>
            <MCIcons name="plus" size={35} color="#FFFFFF"></MCIcons>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  centering_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon_btn: {
    width: 75,
    height: 75,
    elevation: 2,
    marginBottom: 20,
    borderRadius: 100,
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 2,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#BE7EFF',
  },

});

const map_state_props = (state) => {
  return {
    entries: state.entries,
    refreshing: state.refreshing,
  }
};

export default connect(map_state_props)(Home);