import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { LockedPage } from './locked/locked.page';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  logoutTimer = new BehaviorSubject(0);
  constructor(private plt: Platform, private modalCtrl: ModalController) {
    // Lock app immediately it moves into the background
      this.plt.pause.subscribe(() => {
        this.lockApp();
      });
  }

  resetLogoutTimer(){
    this.logoutTimer.next(10);
    this.decreaseTimer();
  }

  decreaseTimer(){
    setTimeout(() => {
      if (this.logoutTimer.value === 0) {
          this.lockApp();
       } else{
         this.logoutTimer.next(this.logoutTimer.value - 1);
         this.decreaseTimer();
       }
    }, 1000);
  }

  async lockApp(){
    const modal = await this.modalCtrl.create({
        component: LockedPage
    });
    await modal.present();
    modal.onDidDismiss().then(result => {
      if (result.data && result.data.reset){
         this.resetLogoutTimer();
      }
    });
  }


}
