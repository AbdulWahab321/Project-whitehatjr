import { CameraRoll , ToastAndroid } from "react-native"
var RNFS = require('react-native').NativeModules.RNFS;

 const saveQrToDisk=()=>{
   	this.qr.toDataURL((data) => {
   		RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
   		  .then((success) => {
   			  return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
   		  })
   		  .then(() => {
   			  this.setState({ busy: false, imageSaved: true  })
   			  ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
   		  })
   	})
  }
  export default saveQrToDisk;