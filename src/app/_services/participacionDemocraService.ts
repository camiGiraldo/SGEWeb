import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import * as CryptoJS from 'crypto-js';

@Injectable()
export class ParticipacionDemocraticaService {

  public url:string;

  constructor(private http: Http) {
      // set token if saved in local storage
      this.url = environment.urlServices;
  }

  getParticipacionById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idParticipacionDemocratica', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getParticipacionById',
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


  saveParticipacion(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idParticipacionDemocratica', data.idParticipacionDemocratica);
    myParams.set('idFormaParticipacion', data.idFormaParticipacion);
    myParams.set('organoGremial', data.organoGremial);
    let fechaInicio =  new Date(data.fechaInscripcion.replace(/-/g, '/'));
    let fechaEleccion =  new Date(data.fechaEleccion.replace(/-/g, '/'));
    myParams.set('fechaInscripcion', ""+fechaInicio.getTime());
    myParams.set('fechaEleccion', ""+fechaEleccion.getTime());
    myParams.set('vigencia', data.vigencia);
    let fechaLimite =  new Date(data.fechaLimite.replace(/-/g, '/'));
    myParams.set('fechaLimite', ""+fechaLimite.getTime());
    myParams.set('dependenciaSupervisa', data.dependenciaSupervisa);
    myParams.set('personaACargo', data.personaACargo);
    myParams.set('correoElectronico', data.correoElectronico);
    myParams.set('telefono', data.telefono);
    myParams.set('enlaceVotaciones', data.enlaceVotaciones);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveParticipacion',
                   myParams.toString(),
                   {headers : headers});
  }
  //Lista los egresados que participaron
  getEgresadosParticipantes(id:string){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idParticipacionDemocratica', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getParticipacionesEgresadoByIdParticipacion',
                   myParams.toString(),
                   {headers : headers});
  }
  //obtiene la informacion de un egresado regitrado a un aporte
  getEgresadoParticipacionById(idEgresadoParticipacion){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresadoParticipacion', idEgresadoParticipacion);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getParticipacionEgresadoById',
                   myParams.toString(),
                   {headers : headers});
  }

  fileUpload(file){

  }
  //registra el egresado a la participacion
  registrarEgresadoPartcipacion(data:any){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idParticipacionEgresado', data.idParticipacionEgresado);
    myParams.set('idParticipacionDemocratica', data.idParticipacionDemocratica);
    myParams.set('idEgresado', data.idEgresado);
    myParams.set('inscrito', data.inscrito);
    myParams.set('elegido', data.elegido);
    myParams.set('socioFundador', data.socioFundador);
    myParams.set('socioAdherente', data.socioAdherente);
    myParams.set('beneficiario', data.beneficiario);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveParticipacionEgresado',
                   myParams.toString(),
                   {headers : headers});
  }


  deleteEgresadoParticipacion(idEgresadoParticipacion){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresadoParticipacion', idEgresadoParticipacion);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'deleteEgresadoParticipacion',
                   myParams.toString(),
                   {headers : headers});
  }


}
