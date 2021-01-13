
import {
    PermissionsAndroid,
  } from 'react-native';

export default class Get_Permission{
    
      requestReadExternalStorage = async () => {
        try{  
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: '저장공간 권한 요구',
              message:
              "사용자에게 저장공간 접근 권한을 요청합니다.",
              buttonNeutral: "나중에 물어봐주세요",
              buttonNegative: "취소",
              buttonPositive: "확인",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can access to external storage");
          } else {
            console.log("external storage read permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    };
    requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "카메라 권한 요구",
            message:
              "사용자에게 카메라 권한을 요청합니다.",
            buttonNeutral: "나중에 물어봐주세요",
            buttonNegative: "취소",
            buttonPositive: "확인"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    
  }