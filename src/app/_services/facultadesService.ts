import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class FacultadesService{

  public url:string;

  constructor(private http : Http){
    this.url = environment.urlServices;
  }

  getFacultadById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idFacultad', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getFacultadById',
                   myParams.toString(),
                   {headers : headers});
  }
 //metodo que se comunica para con el back el cual guarda o edita una facultad
  saveFacultad(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idFacultad', data.idFacultad);
    myParams.set('nombre', data.nombre);
    myParams.set('abreviatura', data.abreviatura);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveFacultad',
                   myParams.toString(),
                   {headers : headers});
  }

  //SERVICIOS PARA LOS PROGRAMAS

  getProgramaById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idFacultad', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getProgramaById',
                   myParams.toString(),
                   {headers : headers});

  }

  savePrograma(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('id', data.id);
    myParams.set('nombre', data.nombre);
    myParams.set('descripcion', data.descripcion);


    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'savePrograma',
                   myParams.toString(),
                   {headers : headers});
  }

}
