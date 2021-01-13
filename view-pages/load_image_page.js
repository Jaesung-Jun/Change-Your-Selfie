
//import RNFetchBlob from 'rn-fetch-blob';
import React, {Component} from 'react';
import * as Progress from 'react-native-progress';
import {
Platform, 
StyleSheet, 
Text, 
View,
Image,
ColorPropType,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

import Upload_Image from '../image_upload'

export default class Load_Image_Page extends Component{

  render() {
    const {image_info} = this.props.route.params;
    const upload_image = new Upload_Image();
    return (
      <View style={styles.body}>
        <Text style={styles.uppertext}>2020학년도 겨울방학 경험학점제 자기주도학습</Text>
        <View style={styles.selected_image_container}>
          <Text style={styles.selected_image_text}>선택한 이미지</Text>
          <Image
                  style={styles.seleted_image}
                  source={{uri: image_info.path}}
          /> 
          <Text style={styles.uploading_status_text}>업로드 상태 : {upload_image.uploading_status}</Text>
          <View style={styles.progress_bar_container}>
            <Progress.Bar progress={0.1} width={250} color={upload_image.color}/>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  uppertext: {
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: Colors.lighter,
    color: Colors.black,
    padding: 20,
  },
  uploading_status_text: {
    padding: 5,
    fontSize: 12,
    right: 55,
  },
  selected_image_container: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
  },
  progress_bar_container: {
    paddingTop: 100,
  },
  selected_image_text: {
    fontSize: 20,
    padding: 10,
  },
  seleted_image: {
    height : 250,
    width : 250,
    borderColor: Colors.black,
    borderWidth: 2,
  },
  body: {
    backgroundColor: Colors.lighter,
  },
});