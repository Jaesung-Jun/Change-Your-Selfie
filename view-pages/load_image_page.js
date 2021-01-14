
//import RNFetchBlob from 'rn-fetch-blob';
import React, {Component} from 'react';
import * as Progress from 'react-native-progress';
import Draggable from 'react-native-draggable';
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

import axios from 'axios';
import Upload_Image from '../image_upload'

export default class Load_Image_Page extends Component{

  constructor(props){
    super(props);
    const {image_info} = this.props.route.params;
    this.upload_image = new Upload_Image(this);
    this.state = {
      original_image_uri: image_info.path,
      transfered_images_base64: {
        img: "",
        img_m_05: "",
        img_m_04: "",
        img_m_03: "",
        img_m_02: "",
        img_m_01: "",
        img_00: "", 
        img_p_01: "",
        img_p_02: "",
        img_p_03: "",
        img_p_04: "",
        img_p_05: "",
      },
      image_upload_percent: 0.0,
      image_upload_stataus: "",
    };
    
    const image_upload_info = {
      uri: image_info.path,
      style_control_value: 1,
      ratio_control_value: 0,
    };

    const server_info = {
      url: 'http://192.168.154.29',
      port: 8000,
    };

    this.upload_image.uploadImage(image_upload_info, server_info);
  }

  componentWillUnmount(){
    clearTimeout(this.progress_bar_timeout);
  }

  render() {
    this.progress_bar_timeout = this.upload_image.updateProgressBar();
    //
    /*
    setTimeout((function() {
      this.setState({ 
        image_upload_percent: this.state.image_upload_percent + 0.1,
      });

    }).bind(this), 100);*/

    return (
      <View style={styles.body}>
        <Text style={styles.upper_text}>2020학년도 겨울방학 경험학점제 자기주도학습</Text>
        <View style={styles.selected_image_container}>
          <Text style={styles.selected_image_text}>선택한 이미지</Text>
          <Image
                  style={styles.seleted_image}
                  source={{uri: this.state.original_image_uri}}
          /> 
          <Text style={styles.uploading_status_text}>업로드 상태 : {this.state.image_upload_status}</Text>
          <View style={styles.progress_bar_container}>
            <Progress.Bar progress={this.state.image_upload_percent} width={250} color={Colors.Black}/>
            
          </View>
        </View>
      </View>
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
  },
  uploading_status_text: {
    padding: 5,
    fontSize: 12,
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