import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class TipoEventosService{

  public url:string;

  constructor(private http : Http){
    this.url = environment.urlServices;
  }

  getTipoEventoById(id:string){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idTipoEvento', id);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getTipoEventoById',
                   myParams.toString(),
                   {headers : headers});
  }
 //metodo que se comunica para con el back el cual guarda o edita una facultad
 saveTipoEvento(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idTipoEvento', data.idTipoEvento);
    myParams.set('nombre', data.nombre);
    myParams.set('idCategoriaEvento', data.idCategoriaEvento);
    myParams.set('activo', data.activo);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveTipoEvento',
                   myParams.toString(),
                   {headers : headers});
  }


}
