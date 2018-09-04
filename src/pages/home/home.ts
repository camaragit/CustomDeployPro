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
    try {
      const update = await Pro.deploy.checkForUpdate()
      if (update.available){
        // We have an update!

        console.log("checkForUpdate ===> Mis a jour dispo");
        try {
          await Pro.deploy.downloadUpdate((progress) => {
            console.log("Progression telechargement "+JSON.stringify(progress));
          })
          try{
            await Pro.deploy.extractUpdate((progress) => {
              console.log("Progression telechargement "+progress);
            })
            try {
              await Pro.deploy.reloadApp();
            }
            catch (err){
              console.log("Erreur extractUpdate "+JSON.stringify(err))

            }

          }
          catch (err){
            console.log("Erreur extractUpdate "+JSON.stringify(err))
          }


        }
        catch (err){
          console.log("Erreur downloadUpdate "+JSON.stringify(err))
        }

      }
      else  console.log("checkForUpdate ===> Pas de Mis a jour dispo")
    }
    catch (err){
      console.log("Erreur checkForUpdate "+JSON.stringify(err))
    }


  }
}
