import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import * as CryptoJS from 'crypto-js';

@Injectable()
export class AporteService {

  public url:string;

  constructor(private http: Http) {
      // set token if saved in local storage
      this.url = environment.urlServices;
  }

  getAporteById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idAporteInvestigacion', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getAporteById',
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


  saveAporte(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idAporteInvestigacion', data.idAporteInvestigacion);
    myParams.set('idTipoAporte', data.idTipoAporte);
    let fechaInicio =  new Date(data.fechaRealizacion.replace(/-/g, '/'));
    let fechaFin = new Date(data.fechaFinalizacion.replace(/-/g, '/'));
    myParams.set('fechaRealizacion', ""+fechaInicio.getTime());
    myParams.set('fechaFinalizacion', ""+fechaFin.getTime());
    myParams.set('grupoBeneficiario', data.grupoBeneficiario);
    myParams.set('subGrupoBeneficiario', data.subGrupoBeneficiario);
    myParams.set('nombreProyecto', data.nombreProyecto);
    myParams.set('descripcionProyecto', data.descripcionProyecto);
    myParams.set('personaACargo', data.personaACargo);
    myParams.set('correoElectronico', data.correoElectronico);
    myParams.set('telefono', data.telefono);
    myParams.set('adjunto', data.adjunto);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveAporte',
                   myParams.toString(),
                   {headers : headers});
  }
  //Lista los egresados del aporte
  getEgresadosAportes(id:string){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idAporteInvestigacion', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getEgresadoAporteByIdAporte',
                   myParams.toString(),
                   {headers : headers});
  }
  //obtiene la informacion de un egresado regitrado a un aporte
  getEgresadoAporteById(idEgresadoAporte){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresadoAporte', idEgresadoAporte);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getEgresadoAporteById',
                   myParams.toString(),
                   {headers : headers});
  }

  fileUpload(file){

  }

  registrarEgresadoAlAporte(data:any){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresadoAporte', data.idEgresadoAporte);
    myParams.set('idAporteInvestigacion', data.idAporteInvestigacion);
    myParams.set('idEgresado', data.idEgresado);
    myParams.set('participacion', data.participacion);
    myParams.set('urlExterna', data.urlExterna);
    myParams.set('soporte', data.soporte);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveEgresadoAporte',
                   myParams.toString(),
                   {headers : headers});
  }


  deleteEgresadoAporte(idEgresadoAporte){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresadoAporte', idEgresadoAporte);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'deleteEgresadoAporte',
                   myParams.toString(),
                   {headers : headers});
  }


}
