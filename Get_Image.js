import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
      return new Promise((resolve, reject) => {
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
        });
      });
    }
    
    getphotoFromGallery(){
      const options = {
        mediaType: 'photo',
      };
      return new Promise((resolve, reject) => {
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
        });
      });
    }
  }