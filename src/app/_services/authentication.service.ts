import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

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
        this.url ='http://192.168.1.66:8080/SGE-WEB/services/';
    }

    login(username: string, password: string): Observable<boolean> {
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('usr', username);
      myParams.set('pas',password);
      let options = new RequestOptions({ headers: headers, params: myParams});


        return this.http.post(this.url+'login',
            myParams.toString(),
            {headers : headers}
            )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response


                let data = response.json().data;
                let token = response.json() && data.token;


                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
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

    }
}
