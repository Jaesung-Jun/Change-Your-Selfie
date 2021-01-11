import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
 

export default class Load_Image_Page extends Component{
 
  render() {
    const {image_info} = this.props.route.params;
    return (
      <View>
        <Text>Second Screen</Text>
        <Text>image : {JSON.stringify(image_info)}</Text>
      </View>
    );
  }
}
