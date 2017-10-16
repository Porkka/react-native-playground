import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { Menu, MenuOptions, MenuOption,  MenuTrigger } from 'react-native-popup-menu'

class Item extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
				<View style={ styles.list_item }>
				  <TouchableOpacity style={ styles.list_item_btn } onPress={ () => { this.props.handleItemPress(this.props.item) } }>
				    <Text style={ styles.list_item_txt }>{this.props.item.name}</Text>
				  </TouchableOpacity>
				  <Menu>
				    <MenuTrigger>
				      <View style={{ flex: 4 }}>
				        <MCIcons name="dots-vertical" size={25} color="#555551"></MCIcons>
				      </View>
				    </MenuTrigger>
				    <MenuOptions>
				      <MenuOption onSelect={() => this.props.handleItemDelete(this.props.item) } text='Delete' />
				      <MenuOption onSelect={() => alert(`Not called`) } disabled={true} text='Disabled' />
				    </MenuOptions>
				  </Menu>
				</View>
      );
    }
}

const styles = StyleSheet.create({

  list_item: {
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


export default Item;