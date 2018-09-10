import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import * as CryptoJS from 'crypto-js';

@Injectable()
export class TiposParticipacionService {

    public url:string;

    constructor(private http: Http) {
        // set token if saved in local storage
        this.url = environment.urlServices;
    }

    getTiposParticipacion(){
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      return this.http.get(this.url+'getFormasParticipacion');
    }

    getTipoParticipacionById(id:string){

      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('idFormaParticipacion', id);

      let options = new RequestOptions({ headers: headers, params: myParams});

      return this.http.post(this.url+'getFormaParticipacionById',
                     myParams.toString(),
                     {headers : headers});
    }

    //metodo que se comunica para con el back el cual guarda o edita una facultad
     saveTipoParticipacion(data:any){
       let headers = new Headers({
           'Content-Type': 'application/x-www-form-urlencoded'
       });

       let myParams = new URLSearchParams();
       myParams.set('idFormaParticipacion', data.idFormaParticipacion);
       myParams.set('nombre', data.nombre);
       myParams.set('activo', data.activo);

       let options = new RequestOptions({ headers: headers, params: myParams});

       return this.http.post(this.url+'saveFormaParticipacion',
                      myParams.toString(),
                      {headers : headers});
     }

}
