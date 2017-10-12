import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native'

import { NavigationActions } from 'react-navigation'
import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import Form from '../../components/todo/Form'

class Save extends Component {

  constructor(props) {
    super(props);
    var ent = this.props.navigation.state.params.entry;
    if(ent) {
      this.props.navigation.setParams({ title: 'Update entry - ' + ent.name });
    } else {
      this.props.navigation.setParams({ title: 'Add entry to Todo list'});
    }

  }

  componentWillMount() {
  }

  componentWillReceiveProps(next_props) {
  }

  render() {
    return (
      <View style={ styles.container }>
        <Form navigation={ this.props.navigation } />
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