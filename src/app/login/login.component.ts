import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import { routerTransition } from '../router.animations';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;



    constructor(
      private router: Router,
      private authenticationService: AuthenticationService) {




      }



    ngOnInit() {
      this.authenticationService.logout();
      this.loginForm = new FormGroup({
        username: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
      });



      //console.log(CryptoJS.AES.encrypt("Message", "Secret Passphrase").toString());

    }

    onLoggedin() {

      const username = this.loginForm.value['username'];
      const password = this.loginForm.value['password'];
      this.authenticationService.login(username, password)

          .subscribe(result => {
              if (result === true) {
                  // login successful
                  localStorage.setItem('isLoggedin', 'true');
                  this.router.navigate(['/dashboard']);
              } else {
                  // login failed
              }
          });


    }
}
