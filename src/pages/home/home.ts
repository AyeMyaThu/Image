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

  constructor(public navCtrl: NavController, private camera: Camera) {
    initializeApp(config);
  }

  //take photo and save to firebase storage but the last photo
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
  }

}
