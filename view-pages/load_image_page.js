
//import RNFetchBlob from 'rn-fetch-blob';
import React, {Component} from 'react';
import * as Progress from 'react-native-progress';
import Draggable from 'react-native-draggable';
import {
Platform, 
StyleSheet, 
Animated,
Text, 
View,
Image,
ColorPropType,
PanResponder,
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
      original_image_base64: "",
      transfered_images_base64: ["", "", "", "", "", "", "", "", "", "", ""],
      now_viewing_image: "",
      image_upload_percent: 0.0,
      image_upload_status: "",
      progress_bar_timeout: ({}),
      upload_complete: false,
    };
  }

  componentDidMount(){

    this._isMounted = true;

    this.image_upload_info = {
      uri: this.state.original_image_uri,
      init_style_control_value: -0.0,
      init_ratio_control_value: 0,
      increasing_count : 10,
      increasing_control_value: 0.1 ,
    };

    this.server_info = {
      url: 'http://192.168.154.29',
      port: 8000,
    };

    if(this._isMounted){
      this.upload_image.uploadImage(this.image_upload_info, this.server_info);
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
    clearTimeout(this.state.progress_bar_timeout);
  }

  render() {
    //this.progress_bar_timeout = this.upload_image.updateProgressBar(0.1);
    //
    /*
    setTimeout((function() {
      this.setState({ 
        image_upload_percent: this.state.image_upload_percent + 0.1,
      });

    }).bind(this), 100);*/
    //console.log(this.state.now_viewing_image.substring(5000, 5004));

    return (
      <View style={styles.body}>
        <Text style={styles.upper_text}>2020학년도 겨울방학 경험학점제 자기주도학습</Text>
        <View style={styles.selected_image_container}>
          <Text style={styles.selected_image_text}>선택한 이미지</Text>
          <Image
                  style={styles.seleted_image}
                  //source={{uri: this.state.original_image_uri}}
                  source={{uri: `data:image/jpeg;base64,${this.state.now_viewing_image}`,}}
          /> 
          <Text style={styles.uploading_status_text}>업로드 상태 : {this.state.image_upload_status}</Text>
          <View style={styles.progress_bar_container}>
            <Progress.Bar progress={this.state.image_upload_percent} width={250} color={Colors.Black}/>
            <Draggable
              x={230}
              y={86}
              minY={86} maxY={86} minX={10} maxX={265}         //0-392.34375
              renderText=""
              onDragRelease={async (e) => {
                if(this._isMounted){
                  this.upload_image.updateImage(e.nativeEvent.pageX, this.image_upload_info.increasing_count);
                }
              }}
              renderSize={this.state.upload_complete ? 35 : 0 }
              renderColor='blue'
              isCircle
              //{...this.panResponder.panhandlers}
            />
            <View style={{opacity: this.state.upload_complete ? 1 : 0 }}>
              <Text style={styles.slide_text}>왼쪽 오른쪽으로 슬라이드 해보세요!</Text>
            </View>
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
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  
  slide_text: {
    padding: 30,
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