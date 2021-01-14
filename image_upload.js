/*
request POST

* parameters : 
    1. image - (image byte file)
    2. ratio_control_value - 높아지면 더 진해진다.
    3. style_control_value - 높아지면 더 진해진다.
    -> 두값 동시에 0.1씩 올리는게 좋음.
    -> -0.5 ~ 0.5 로 범위를 정하는게 좋다.
*/

import axios from 'axios';
import RNFS from 'react-native-fs';

export default class Upload_Image{
  constructor(props) {
    this.props = props;
  }
  
  updateStatus(nowValue){
    /*
    return new Promise((resolve, reject) => {
      if(nowValue < 1){
        resolve("Uploading...")
      }else if(nowValue >= 1){
        resolve("Upload Complete!");
      }else{
        reject();
      }
    }).catch((err) => { console.log(err)} );
    */
    if(nowValue < 1){
      return "Uploading...";
    }else if(nowValue >= 1){
      return "Upload Complete!";
    }else{
      return "";
    }
  }
  
  updateImage(){

  }

  updateProgressBar(){

    let updated_value = this.props.state.image_upload_percent + 0.1;
    if(updated_value > 1){
      updated_value = 1;
    }
    let updated_status = this.updateStatus(updated_value);

    let progress_bar_update = setTimeout((function() {
      this.setState({ 
        image_upload_percent: updated_value,
        image_upload_status: updated_status,
      });
    }).bind(this.props), 100)

    return progress_bar_update;
  }

  imageToBase64(image_uri){
    let image_to_base64;
    
    return new Promise((resolve, reject) => {
      RNFS.readFile(image_uri, 'base64')
      .then(res =>{
        image_to_base64 = res;
        resolve(image_to_base64);
      }).catch((err) => {console.log(err)});
    });
  }

  async uploadImage(image_upload_info, server_info){

    let image_to_base64 = await this.imageToBase64(image_upload_info.uri)
    //console.log(image_to_base64);
    const fd = new FormData();

    fd.append('image', image_to_base64);
    fd.append('ratio_control_value', image_upload_info.ratio_control_value);
    fd.append('style_control_value', image_upload_info.style_control_value);

    let files = {
      image: image_to_base64,
      ratio_control_value: image_upload_info.ratio_control_value,
      style_control_value: image_upload_info.style_control_value,
    };
    axios({
      method: 'post',
      timeout: 1000,
      url: server_info.url + ":" + server_info.port + "/predict",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify(files)
      /*data: file{
        image: image_to_base64,
        ratio_control_value: file_info.ratio_control_value,
        style_control_value: file_info.style_control_value,
      },*/
      //data: JSON.stringify(fd),
      }).then(res => {
        console.log("server response : " + JSON.stringify(res.data))
      }).catch(error => {
        console.log(error);
      });
  }
}