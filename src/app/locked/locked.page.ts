import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { ModalController } from "@ionic/angular";
const { BiometricAuth } = Plugins;

@Component({
  selector: "app-locked",
  templateUrl: "./locked.page.html",
  styleUrls: ["./locked.page.scss"],
})
export class LockedPage implements OnInit {
  showFallback = true;
  password = "1234";
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
    console.log("openBiometricAuth");
    const authResult = await BiometricAuth.verify({
      reason: "Your session timed out",
      title: "Your session timed out",
    });

    if (authResult.verified) {
      this.dismissLockScreen();
    } else {
      alert("Biometric Verfication Failed");
    }
  }

  dismissLockScreen() {
    this.modalCtrl.dismiss({ reset: true });
  }

  unlockScreen() {
    console.log("Unlock Screen");
    if (this.password === "1234") {
      this.dismissLockScreen();
    } else {
      alert("Invalid password");
    }
  }
}
