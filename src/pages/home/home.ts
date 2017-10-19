import { Camera, CameraOptions } from '@ionic-native/camera';
import { config } from './../../app/firebase.config';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { storage, initializeApp } from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picdata: any;
  picurl: any;
  mypicref: any;

  constructor(public navCtrl: NavController, private camera: Camera) {
    initializeApp(config);
    this.mypicref = storage().ref('/');
  }

  //take photo save to storage and show in img
  takePhoto(){
    let options: CameraOptions = {
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imagedata)=>{
      this.picdata = imagedata;
      this.upload();
    })
  }

  upload(){
    this.mypicref.child(this.uid()).putString(this.picdata, 'base64',{contentType:'image/png'})
    .then((savepic)=>{
      this.picurl = savepic.downloadURL;
    })
  }

  uid(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c){
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return ( c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  /* //take photo and save to firebase storage but the last photo
  async takePhoto() {
    try{
      let options: CameraOptions = {
        quality: 100,
        encodingType: this.camera.EncodingType.JPEG,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      const result = await this.camera.getPicture(options);
      const image = 'data:image/jpeg;base64,' + result;
      const picture = storage().ref('pictures');
      picture.putString(image,'data_url');
    
    } catch(err){
      console.log(err);
    }
  }  */
}
