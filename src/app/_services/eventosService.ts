import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class EventosService{

  public url:string;

  constructor(private http : Http){
    this.url = environment.urlServices;
  }

  getProgramaById(id:string){

      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('idPrograma', id);

      let options = new RequestOptions({ headers: headers, params: myParams});

      return this.http.post(this.url+'getProgramaById',
                     myParams.toString(),
                     {headers : headers});

    }
   saveFile(form:any){
      let headers = new Headers({
          'Content-Type': 'multipart/form-data'
      });




    

      return this.http.post(this.url+'uploadFile',
                     form,
                     {headers : headers});
    }


    savePrograma(data:any){
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('idPrograma', data.id);
      myParams.set('nombre', data.nombre);
      myParams.set('abreviatura', data.descripcion);
      myParams.set('idFacultad', data.idFacultad);


      let options = new RequestOptions({ headers: headers, params: myParams});

      return this.http.post(this.url+'savePrograma',
                     myParams.toString(),
                     {headers : headers});
    }


    getFacultades(){

      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      return this.http.get(this.url+'getFacultades');

    }



}
