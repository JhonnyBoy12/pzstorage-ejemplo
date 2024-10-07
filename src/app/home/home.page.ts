import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre: string = "";
  valor: string = "";

  constructor(private alertController: AlertController, private storage: NativeStorage, private bd: ServicebdService) {}

  crear(){
    this.storage.setItem(this.nombre, this.valor);
    this.presentAlert("Variable de Storage Creada");
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
