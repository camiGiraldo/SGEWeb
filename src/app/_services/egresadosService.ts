import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class EgresadosService{

  public url:string;

  constructor(private http : Http){
    this.url ='http://192.168.1.70:8080/SIGEG-WEB/services/';
  }


  getEgresadoById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresado', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getEgresadoById',
                   myParams.toString(),
                   {headers : headers});

  }
 //metodo que se comunica para con el back el cual guarda o edita una facultad
  saveEgresado(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    /*let myParams = new URLSearchParams();
    myParams.set('id', data.id);
    myParams.set('nombre', data.nombre);
    myParams.set('director', data.director);
    myParams.set('descripcion', data.descripcion);


    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveFacultad',
                   myParams.toString(),
                   {headers : headers});*/
  }

}
