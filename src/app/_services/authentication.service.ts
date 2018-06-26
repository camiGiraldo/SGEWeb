import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthenticationService {
    public token: string;
    public url:string;
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}

    get isLoggedIn() {

     return this.loggedIn.asObservable(); // {2}
    }

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.url ='http://localhost:8080/SIGEG-WEB/services/';
    }

    login(username: string, password: string): Observable<boolean> {
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('usr', CryptoJS.AES.encrypt(username, "Un14jc2018!!.").toString());
      myParams.set('pas',password);
      let options = new RequestOptions({ headers: headers, params: myParams});


        return this.http.post(this.url+'login',
            myParams.toString(),
            {headers : headers}
            )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response


                let status = response.json().status;



                if (status == 'OK') {
                    // set token property

                    let data = response.json().data;
                    this.token = data.token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));
                    localStorage.setItem('isLoggedin', 'true');
                    this.loggedIn.next(true);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
        localStorage.clear();

    }
}
