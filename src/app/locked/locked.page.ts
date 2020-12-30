import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
const { BiometricAuth } = Plugins;

@Component({
  selector: 'app-locked',
  templateUrl: './locked.page.html',
  styleUrls: ['./locked.page.scss'],
})
export class LockedPage implements OnInit {
  showFallback = true;
  password = '1234';
  hasBiometricAuth = false;

  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {
    const available = await BiometricAuth.isAvailable();
    this.hasBiometricAuth = available.has;

    if (this.hasBiometricAuth) {
      this.openBiometricAuth();
    }
  }

  async openBiometricAuth() {
    const authResult = await BiometricAuth.verify({
      reason: 'Your session timed out',
      title: 'Your session timed out',
    });

    if (authResult.verified) {
      this.dismissLockScreen();
    }
  }

  dismissLockScreen() {
    this.modalCtrl.dismiss({ reset: true });
  }

  unlockScreen() {
    if (this.password == '1234') {
      this.dismissLockScreen();
    }
  }
}
