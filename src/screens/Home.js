import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native'

import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { readEntries } from '../redux/modules/entries/actions'

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
      data_source: [ ],
      refreshing: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(readEntries());
  }

  componentWillReceiveProps(next_props) {
    if(this.props.entries !== next_props.entries) {
      this.setState({
        data_source: next_props.entries.entries
      });
    }
    this.setState({refreshing: false});
  }

  _keyExtractor = (item, index) => item.id;

  _handleRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(readEntries());
  }

  render() {
    if(!this.state.data_source.length) {
      var content = (
        <View style={[ styles.centering_container, { flex: 1 } ]}>
          <View style={[  styles.icon_btn , styles.centering_container, { marginBottom: 20 } ]}>
            <MCIcons name="lead-pencil" size={55} color="#C7C7C7"></MCIcons>
          </View>
          <Text style={{ fontSize: 16 }}>UU YEAH!</Text>
        </View>
      );
    } else {
      var ds = this.state.data_source;
      var content = (
        <View style={ styles.list }>
          <FlatList data={ ds } keyExtractor={this._keyExtractor} refreshing={ this.state.refreshing } onRefresh={ () => this._handleRefresh() } renderItem={ ({item}) => <View style={ styles.list_item }>
            <View style={{ justifyContent: 'center', flex: 14 }}>
              <Text style={ styles.list_item_txt }>{item.name}</Text>
            </View>
            <MCIcons name="dots-vertical" size={25} color="#555551" style={{ flex: 1 }}></MCIcons>
          </View>}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {content}
        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity style={[ styles.centering_container, styles.icon_btn ]} onPress={ () => this.props.navigation.navigate('EntrySave') }>
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

  list: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  },

  list_item: {
    marginBottom: 3,
    paddingVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },

  list_item_txt: {
    fontSize: 14,
  },

  icon_btn: {
    width: 75,
    height: 75,
    elevation: 2,
    marginBottom: 20,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BE7EFF',
  },

});

const map_state_props = (state) => {
  return {
    entries: state.entries,
  }
};

export default connect(map_state_props)(Home);