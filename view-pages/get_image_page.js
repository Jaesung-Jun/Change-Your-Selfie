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
} from 'react-native/Libraries/NewAppScreen'

export default class Get_Image_Page extends Component{

  async buttonPress(navigation, get_image_from_where, to_navigate){    // where : string, to_navigate : string
    
    const get_image = new Get_Image();
    let res;
    try{
      if(get_image_from_where == 'camera'){
        res = await get_image.getphotoFromCamera();
      }else if(get_image_from_where == 'gallery'){
        res = await get_image.getphotoFromGallery();
      }
    }catch(err){
      console.log(err);
    }
    console.log("image info : " + JSON.stringify(res));
    navigation.navigate(to_navigate, {image_info: res});
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <SafeAreaView>
              <View style={styles.body}>
                <Text style={styles.upper_text}>2020학년도 겨울방학 경험학점제 자기주도학습</Text>
                <View style={styles.middle_logo_container}>
                <Image
                  style={styles.middle_logo}
                  source={require('../logo.png')}/>
                <Text style={styles.middle_text}>GAN Transfer</Text>
                <View style={styles.bottom_button1}>
                  <Button
                    title="사진찍어서 가져오기"
                    onPress={() => this.buttonPress(this.props.navigation, 'camera', 'Load_Image_Page')}
                  />
                </View>
                <View style={styles.bottom_button2}>
                  <Button
                    title="갤러리에서 가져오기"
                    onPress={() => this.buttonPress(this.props.navigation, 'gallery', 'Load_Image_Page')}
                  />
                </View>
                </View>
                <View style={{paddingTop: 70}}>
                </View>
                <View style={styles.smu_logo_container}>
                  <Image
                    style={styles.smu_logo}
                    source={require('../smu_logo.jpg')}/>
                </View>
              </View>
          </SafeAreaView>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  upper_text: {
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: Colors.lighter,
    color: Colors.black,
    padding: 20,
    paddingBottom: 80,
  },
  middle_logo_container: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  middle_logo: {
    height:200,
    width:200,
  },
  smu_logo_container: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smu_logo: {
    height:17,
    width:218,
  },
  bottom_button1: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  bottom_button2: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  middle_text: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 70,
    paddingTop: 10,
  },
  body: {
    backgroundColor: Colors.lighter,
  },
});
