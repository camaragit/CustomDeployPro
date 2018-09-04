import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Pro} from "@ionic/pro";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    this.checkForUpdate();
  }
  async checkForUpdate() {
    const update = await Pro.deploy.checkForUpdate()
    if (update.available){
      // We have an update!

      console.log("checkForUpdate ===> Mis a jour dispo")
      await Pro.deploy.downloadUpdate((progress) => {
        console.log("Progression"+JSON.stringify(progress));
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.reloadApp();
    }
    else  console.log("checkForUpdate ===> Pas de Mis a jour dispo")

  }
}
