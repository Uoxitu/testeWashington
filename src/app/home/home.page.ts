import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public FGroup: FormGroup;

  constructor(private FBuilder: FormBuilder, private storage: Storage, private camera: Camera, public actionSheetController: ActionSheetController) {

    this.FGroup = this.FBuilder.group({

      'nome': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'sobreNome': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'enderecoComercial': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'numero': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'complemento': [null, Validators.compose([

      ])],


      'cep': [null, Validators.compose([
        Validators.required
      ])],

      'cidade': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'uf': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ])],

      'telComercial': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'telCelular': [null, Validators.compose([

      ])],



      'email': [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required])]
    })
  }


  submitForm() {
  }
  
  getGaleria() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.storage.set('foto', imageData);
    }, (err) => {
      console.error(err);
    });
  }

  getCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.storage.set('foto', imageData);
    }, (err) => {
      console.error(err);
    });
  }


  async presentActionSheet() {

    console.log('teste');

    const actionSheet = await this.actionSheetController.create({
      header: 'Foto',
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          alert('Foto excluída.')
        }
      }, {
        text: 'Galeria',
        icon: 'albums',
        handler: () => {
          this.getGaleria();
        }
      }, {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.getCamera();
        }
      }]
    });
    await actionSheet.present();
  }
}
