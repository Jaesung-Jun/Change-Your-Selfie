import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Get_Permission from './Get_Permission'

export default class Get_Image {

    constructor(){
      this.res = false;
    }
  
    getphotoFromCamera(){
  
      const get_permission = new Get_Permission();
      
      const options = {
        mediaType: 'photo',
      };
      get_permission.requestCameraPermission();
      get_permission.requestReadExternalStorage();
      return new Promise((resolve, reject) => {  
        ImagePicker.openCamera({
          useFrontCamera: true,
          width: 500,
          height: 500,
          cropping: true
        }).then(image => {
          resolve(image);
        }).catch((err) => { console.log(err)} );
        /*
        launchCamera(options, (res) => {      //res는 반환한 객체, https://github.com/react-native-image-picker/react-native-image-picker/blob/main/README.md#options 참고.
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(res));
            resolve(res);
          }
      });*/
    });
  }
    
    getphotoFromGallery(){
      const options = {
        mediaType: 'photo',
      };
      return new Promise((resolve, reject) => {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true
        }).then(image => {
          resolve(image);
        }).catch((err) => { console.log(err)} );
        /*
        launchImageLibrary(options, (res) => {      //res is callback, https://github.com/react-native-image-picker/react-native-image-picker/blob/main/README.md#options 참고.
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(this.res));
            resolve(res);
          }
        });*/
      });
    }
  }