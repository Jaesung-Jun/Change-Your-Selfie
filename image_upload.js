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
  
  updateImage(coord_x, increasing_count){
    let index = Math.floor((coord_x/392) * increasing_count);     //0-392.34375
    let _now_viewing_image;
    //console.log(index);
    
    if(index === 0){
      _now_viewing_image = this.props.state.original_image_base64
    }else{
      _now_viewing_image = this.props.state.transfered_images_base64[index];
    }
    this.props.setState({
      now_viewing_image: _now_viewing_image,
    });
  }

  updateProgressBar(progress_value){

    let updated_value = this.props.state.image_upload_percent + progress_value;
    if(updated_value > 1){
      updated_value = 1;
    }
    //console.log(updated_value);
    //let updated_status = this.updateStatus(updated_value);

    let progress_bar_update = setTimeout((function() {
      this.setState({ 
        image_upload_percent: updated_value,
        //image_upload_status: updated_status,
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
        //console.log(image_to_base64);
        resolve(image_to_base64);
      }).catch((err) => {console.log(err)});
    });
  }

  async uploadImage(image_upload_info, server_info){

    let image_to_base64 = await this.imageToBase64(image_upload_info.uri)
    //console.log(image_to_base64);
    //let image_transfered_array = this.props.state.transfered_images_base64;
                                                                                                        
    this.props.setState({  
      original_image_base64: image_to_base64,
      //transfered_images_base64: image_transfered_array,
    });
    console.log("init style control value : " + image_upload_info.init_style_control_value)
    
    let files;
    let transfered_image_index = 0;
    let i;

    console.log("Start Sending Request");
    for (i = image_upload_info.init_style_control_value; 
         i <= (image_upload_info.init_style_control_value + 
              (image_upload_info.increasing_control_value * 
              image_upload_info.increasing_count)); 
         i += image_upload_info.increasing_control_value){

      files = {
        image: this.props.state.original_image_base64,
        ratio_control_value: i/20,
        style_control_value: i,
      };

      console.log("ratio_control_value : " + files.ratio_control_value + " | " + "style_control_value : " + files.style_control_value);
      await axios({
        method: 'post',
        timeout: 10000,
        url: server_info.url + ":" + server_info.port + "/predict",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: JSON.stringify(files)
        }).then(res => {
          this.props.setState({  
            image_upload_status: "서버에 연결하는 중... - #" + (transfered_image_index+1),
          });
          if (JSON.stringify(res.data.image) === undefined){        //Response failed
            i -= image_upload_info.increasing_control_value;
            this.props.setState({  
              image_upload_status: "다시 시도하는 중 - #" + (transfered_image_index+1)
            });
            console.log(res.data + "       -----------------------", (transfered_image_index+1));
          }else{          //Response Successed
            let temp_array = this.props.state.transfered_images_base64;
            temp_array[transfered_image_index] = res.data.image;
            this.props.setState({  
              image_upload_status: "성공적으로 데이터를 받았습니다. - #" + (transfered_image_index+1),
              now_viewing_image: res.data.image,
              transfered_images_base64: temp_array,
            });
            //console.log(res.data);
            //console.log("server response : " + res.data.image);
            console.log("Server Responsed Successfully. -----------------------", (transfered_image_index+1));
            transfered_image_index++;
            this.props.state.progress_bar_timeout = this.updateProgressBar(
              image_upload_info.increasing_control_value / 
              (image_upload_info.increasing_control_value * 
              image_upload_info.increasing_count)
            );
            //console.log(this.props.state.transfered_images_base64[2]);
          }
        }).catch(error => {
          // stop loop
          if(error.toString().includes("Network Error")){
            i -= image_upload_info.increasing_control_value;
            this.props.setState({  
              image_upload_status: "다시 시도하는 중 - #" + (transfered_image_index+1),
            });
            console.log("Network Error       -----------------------", transfered_image_index);
          }else{
            i = (image_upload_info.init_style_control_value + 
                (image_upload_info.increasing_control_value *
                 image_upload_info.increasing_count));        //back to just before request
            this.props.setState({  
              image_upload_status: "서버에 연결할 수 없습니다.",
            });
          console.log(error);
          }

        });
    }
    this.props.setState({
      upload_complete: true,
      image_upload_status: "전송완료!"
    });
  }
}