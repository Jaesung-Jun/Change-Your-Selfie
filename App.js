/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Get_Image from './Get_Image'

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

class logo_Motion extends React.Component {
  state = {
    animation: new Animated.Value(0)
  }
}

export default class GAN_Transfer extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    const get_image = new Get_Image();

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Text style={styles.uppertext}>
                2020학년도 겨울방학 경험학점제 자기주도학습
              </Text>
              <View style={styles.middle_logo_container}>
                <Image
                  style={styles.middle_logo}
                  source={require('./logo.png')}
                />
                <Text style={styles.middle_text}>GAN Transfer</Text>
                <View style={styles.bottom_button1}>
                  <Button
                    title="사진찍어서 가져오기"
                    onPress={() => get_image.getphotoFromCamera()}
                  />
                </View>
                <View style={styles.bottom_button2}>
                  <Button
                    title="갤러리에서 가져오기"
                    onPress={() => {get_image.getphotoFromGallery(); console.log(JSON.stringify(get_image.res))}}
                  />
                </View>
              </View>
              <View style={{paddingTop: 130}} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
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
