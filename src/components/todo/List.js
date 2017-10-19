import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import TodoItem from './Item'


class List extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.list }>
        <FlatList data={ this.props.data_source } 
          keyExtractor={ this._keyExtractor } 
          refreshing={ this.props.refreshing } 
          onRefresh={ () => this.props.handleListRefresh() } renderItem={ this._renderItem } />
      </View>
    );
  }

  /**
   * Render list item, which in this case is it's own component.
   * Pass in the action and item as props, so they can be called from the TodoItem.
   */
  _renderItem = ({ item, index }) => (
    <TodoItem item={ item } 
     index={ index }
     handleItemPress={ (item) => this.props.handleItemPress(item) } 
     handleItemDelete={ (item) => this.props.handleItemDelete(item) } />
  )

  _keyExtractor = (item, index) => item.id;

}

const styles = StyleSheet.create({

  list: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  },

});

export default List;