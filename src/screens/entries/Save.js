import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native'

import { NavigationActions } from 'react-navigation'
import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import Form from '../../components/todo/Form'

class Save extends Component {

  static navigationOptions = {
    title: 'Add entry to Todo list',
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(next_props) {
  }

  render() {
    return (
      <View style={ styles.container }>
        <Form/>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  }

});

const map_state_props = (state) => {
  return {
    entries: state.entries,
  }
};

export default connect(map_state_props)(Save);