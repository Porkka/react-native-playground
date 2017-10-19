import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Easing } from 'react-native';

import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { Menu, MenuOptions, MenuOption,  MenuTrigger } from 'react-native-popup-menu'

import { UIManager } from 'react-native'

class Item extends Component {

  constructor(props) {
    super(props);
    this.opacity_value = new Animated.Value(0);
    this.sliding_value = new Animated.Value(400);
  }

  componentDidMount () {
    this.animate()
  }

  animate () {
    Animated.timing(
      this.opacity_value,
      {
        toValue: 1,
        easing: Easing.linear,
        duration: 500 + (100 * this.props.index),
      }
    ).start();
    Animated.timing(
      this.sliding_value,
      {
        toValue: 0,
        easing: Easing.linear,
        duration: 50 * this.props.index,
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={[ styles.list_item, {
          opacity: this.opacity_value,
          transform: [
            { translateX: this.sliding_value }
          ]
        }]}>
			  <TouchableOpacity style={ styles.list_item_btn } onPress={ () => { this.props.handleItemPress(this.props.item) } }>
			    <Text style={ styles.list_item_txt }>{this.props.item.name }</Text>
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
			</Animated.View>
    );
  }

}

const styles = StyleSheet.create({

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


export default Item;