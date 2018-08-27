import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import * as CryptoJS from 'crypto-js';

@Injectable()
export class ReconocimientosService {

  public url:string;

  constructor(private http: Http) {
      // set token if saved in local storage
      this.url = environment.urlServices;
  }

  getReconocimientoById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idReconocimiento', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getReconocimientoById',
                   myParams.toString(),
                   {headers : headers});
  }

  getEgresadoByDocument(tipoDoc:string, numeroDoc:string){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('tipoIdentificacion', tipoDoc);
    myParams.set('identificacion', numeroDoc);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getEgresadoByDocumento',
                   myParams.toString(),
                   {headers : headers});
  }


  saveReconocimeinto(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idReconocimiento', data.idReconocimiento);
    myParams.set('idTipoReconocimiento', data.idTipoReconocimiento);
    myParams.set('adjunto', data.adjunto);
    let dateVinculacion =  new Date(data.fechaVinculacion.replace(/-/g, '/'));
    myParams.set('fechaVinculacion', ""+dateVinculacion.getTime());
    myParams.set('lugarRealizacion', data.lugarRealizacion);
    myParams.set('beneficiario', data.beneficiario);
    myParams.set('descripcion', data.descripcion);
    myParams.set('soporte', data.soporte);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveReconocimiento',
                   myParams.toString(),
                   {headers : headers});
  }

  fileUpload(file){
    
  }


}
