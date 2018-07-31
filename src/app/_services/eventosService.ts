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

  getEventobyId(id:string){
    console.log('sfsdfsd')
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('idEvento', id);

      let options = new RequestOptions({ headers: headers, params: myParams});

      return this.http.post(this.url+'getEventoById',
                     myParams.toString(),
                     {headers : headers});

    }
   saveFile(form:any){
     console.log(form);

      let headers = new Headers({
          'Content-Type': 'multipart/form-data'
      });


headers.append('Accept', 'application/json');


      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.url+'uploadFile',
                     form,
                     options);
    }


    saveEvento(data:any){
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('idEvento',data.idEvento);
      myParams.set('idTipoEvento',data.idTipoEvento);
      myParams.set('nombre',data.nombre);
      myParams.set('fechaInicio',data.fechaInicio);
      myParams.set('fechaFin',data.fechaFin);
      myParams.set('lugar',data.lugar);
      myParams.set('horaInicio',data.horaInicio);
      myParams.set('duracionEstimada',data.duracionEstimada);
      myParams.set('costoEgresado',data.costoEgresado);
      myParams.set('costoUniajc',data.costoUniajc);
      myParams.set('certificable',data.certificable);
      myParams.set('dependenciaOrganiza',data.dependenciaOrganiza);
      myParams.set('dependenciaBeneficiaria',data.dependenciaBeneficiaria);
      myParams.set('comunidadBeneficiaria',data.comunidadBeneficiaria);
      myParams.set('personaACargo',data.personaACargo);
      myParams.set('correoElectronico',data.correoElectronico);
      myParams.set('telefono',data.telefono);
      myParams.set('cuposEgresados',data.cuposEgresados);
      myParams.set('bannerEvento',data.bannerEvento);
      myParams.set('urlInscripcion',data.urlInscripcion);
      myParams.set('adjunto',data.adjunto);
      myParams.set('soporte',data.soporte);


      let options = new RequestOptions({ headers: headers, params: myParams});

      return this.http.post(this.url+'saveEvento',
                     myParams.toString(),
                     {headers : headers});
    }


    getTipoEventos(){

      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      return this.http.get(this.url+'getTiposEvento');

    }


    getEgresados(){

      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      return this.http.get(this.url+'getEgresados');

    }
    getEgresadosbyEvent(id:string){

      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('idEvento', id);

      let options = new RequestOptions({ headers: headers, params: myParams});

      return this.http.post(this.url+'getAsistenciasByIdEvento',
                     myParams.toString(),
                     {headers : headers});

    }

    saveAsistioEvento(data:any){
    
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });

      let myParams = new URLSearchParams();
      myParams.set('idAsistenciaEvento',data.idAsistenciaEvento);
      myParams.set('idEgresado',data.idEgresado);
      myParams.set('idEvento',data.idEvento);
      myParams.set('inscrito',data.inscrito);
      myParams.set('asistio',data.asistio);
      myParams.set('aprobo',data.aprobo);

      let options = new RequestOptions({ headers: headers, params: myParams});
  console.log('save asistio');
      return this.http.post(this.url+'saveAsistenciaEvento',
                     myParams.toString(),
                     {headers : headers});


    }


}
