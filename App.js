/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Get_Image_Page from './view-pages/Get_Image_Page'
import Load_Image_Page from './view-pages/Load_Image_Page';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Animated,
  Alert,
  Text,
  Image,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

export default class GAN_Transfer extends Component{
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Main"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Main" component={Get_Image_Page} />
          <Stack.Screen name="Load_Image_Page" component={Load_Image_Page} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  uppertext: {
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: 'white',
    color: Colors.black,
    padding: 20,
    paddingBottom: 100,
  },
  middle_logo_container: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  middle_logo: {
    height:200,
    width:200,
  },
  bottom_button1: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  bottom_button2: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  middle_text: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },

  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
