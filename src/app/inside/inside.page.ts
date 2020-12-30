import { Component, OnInit } from '@angular/core';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  constructor(public accessService: AccessService) { }

  logoutTimer = this.accessService.logoutTimer.asObservable();

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.accessService.resetLogoutTimer();
  }

}
