///<reference path="authenticationService.ts"/>
import { Component } from '@angular/core';
import {AuthenticationService} from './authenticationService';
import { FormsModule } from '@angular/forms';
import {ResponseService} from './response';
import {ROUTER_CONFIGURATION, Router} from '@angular/router';
import {async} from 'q';


@Component({
  selector: 'app-login-detail',
  templateUrl: './loginDetail.component.html'

})
export class LoginDetailComponent {
  finalresponse = 'false' ;
  success ;
  username;
  password;
  constructor(

    private authenticationService: AuthenticationService , private responseService: ResponseService , private router: Router ) {
   // this.finalresponse =  this.authenticationService.login(this.username, this.password).toString();
  }



  OnUsername(event: Event ) {
    this.username = (<HTMLInputElement>event.target).value;
    }

 OnPassword(event: Event) {
    this.password =  (<HTMLInputElement>event.target).value;

    }

 async   login() {
      this.finalresponse = await this.authenticationService.login(this.username, this.password).toString();
    // this.authenticationService.login(this.username, this.password);
    //  this.finalresponse = this.authenticationService.getAuthenresponse();
    if (this.finalresponse) {
      console.log(this.finalresponse);
      this.router.navigate(['Storage'])
      // this.router.navigate(['Trucks'])
    }
    }
   forward() {
    this.login();
    while (this.finalresponse === 'false' ) {
      console.log(this.finalresponse);
      }
      if (this.finalresponse === 'ok') {
        this.router.navigate(['Trucks'])
      }
   }

}


