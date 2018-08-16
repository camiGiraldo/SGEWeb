import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class CategoriasEventosService{

  public url:string;

  constructor(private http : Http){
    this.url = environment.urlServices;
  }

  getCategoriaEventoById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idCategoriaEvento', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getCategoriaEventoById',
                   myParams.toString(),
                   {headers : headers});
  }
 //metodo que se comunica para con el back el cual guarda o edita una facultad
 saveCategoriaEvento(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idCategoriaEvento', data.idCategoriaEvento);
    myParams.set('nombre', data.nombre);
    myParams.set('activo', data.activo);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveCategoriaEvento',
                   myParams.toString(),
                   {headers : headers});
  }


}
