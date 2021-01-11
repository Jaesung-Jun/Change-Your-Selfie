
import React, { Component } from 'react';
import Get_Image from '../Get_Image'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Animated,
  Text,
  Image,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type Props = {};
export default class Get_Image_Page extends Component<Props>{

  static navigationoptions = {
    title: 'Get_Image_Page',
  };

  render() {
    const get_image = new Get_Image();
    const {navigate} = this.props.navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Text style={styles.uppertext}>2020학년도 겨울방학 경험학점제 자기주도학습</Text>
              <View style={styles.middle_logo_container}>
              <Image
                style={styles.middle_logo}
                source={require('./logo.png')}/>
              <Text style={styles.middle_text}>GAN Transfer</Text>
              <View style={styles.bottom_button1}>
                <Button
                  title="사진찍어서 가져오기"
                  onPress={() => {get_image.getphotoFromCamera(); navigate('load_image_page.js', {image_info: get_image.});}}
                />
              </View>
              <View style={styles.bottom_button2}>
                <Button
                  title="갤러리에서 가져오기"
                  onPress={() => get_image.getphotoFromGallery()}
                />
              </View>
              </View>
              <View style={{paddingTop: 130}}>
        
              </View>
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
  body: {
    backgroundColor: 'white',
  },
});
