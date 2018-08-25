import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';



import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class EgresadosService{

  public url:string;

  constructor(private http : Http){

    this.url = environment.urlServices;
  }


  getEgresadoById(data:any){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresado', data.idEgresado);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'getAllInfoEgresado',
                   myParams.toString(),
                   {headers : headers});

  }

  deleteAcademicInformation(data:any){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idInformacionAcademica', data.idInformacionAcademica);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'deleteInformacionAcademica',
                   myParams.toString(),
                   {headers : headers});

  }
 //metodo que se comunica para con el back el cual guarda o edita una facultad
  saveInfoBasic(data:any){

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idEgresado', data.idEgresado);
    myParams.set('nombres', data.nombres);
    myParams.set('apellidos', data.apellidos);
    myParams.set('tipoIdentificacion', data.tipoIdentificacion);
    myParams.set('identificacion', data.identificacion);
    myParams.set('ciudadExpedicion', data.ciudadExpedicion);
    myParams.set('paisResidencia', data.paisResidencia);
    myParams.set('ciudadResidencia', data.ciudadResidencia);
    myParams.set('direccionResidencia', data.direccionResidencia);
    myParams.set('telefonoFijo', data.telefonoFijo);
    myParams.set('telefonoMovil', data.telefonoMovil);
    myParams.set('telefonoMovilAlterno', data.telefonoMovilAlterno);
    myParams.set('correoElectronico', data.correoElectronico);
    myParams.set('correoElectronicoAlterno', data.correoElectronicoAlterno);



    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveEgresado',
                   myParams.toString(),
                   {headers : headers});
  }

  saveInfoAcademic(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let myParams = new URLSearchParams();
    myParams.set('idInformacionAcademica', data.idInformacionAcademica);
    myParams.set('idEgresado', data.idEgresado);
    myParams.set('idPrograma', data.idPrograma);
    myParams.set('libro', data.libro);
    myParams.set('folio', data.folio);
    myParams.set('acta', data.acta);
    myParams.set('numeroDiploma', data.numeroDiploma);
    myParams.set('semestreGrado', data.semestreGrado);
    myParams.set('formaGrado', data.formaGrado);
    myParams.set('tipoOpcionGrado', data.tipoOpcionGrado);
    myParams.set('notaOpcionGrado', data.notaOpcionGrado);
    myParams.set('semestreFinalizoMaterias', data.semestreFinalizoMaterias);


    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveInformacionAcademica',
                   myParams.toString(),
                   {headers : headers});

  }

  saveInfoControl(data:any){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    let myParams = new URLSearchParams();
    myParams.set('idInformacionControl', data.idInformacionControl);
    myParams.set('idEgresado', data.idEgresado);
    let dateEntregaCarnet = new Date(data.fechaEntregaCarnet);
    let dateEncuestaM0En = new Date(data.encuestaM0En.replace(/-/g, '/'));
    let dateEncuestaM1En = new Date(data.encuestaM1En.replace(/-/g, '/'));
    let dateEncuestaM5En = new Date(data.encuestaM5En.replace(/-/g, '/'));
    myParams.set('fechaEntregaCarnet', ""+dateEntregaCarnet.getTime());
    myParams.set('encuestaM0En', ""+dateEncuestaM0En.getTime());
    myParams.set('encuestaM1En', ""+dateEncuestaM1En.getTime());
    myParams.set('encuestaM5En', ""+dateEncuestaM5En.getTime());
    myParams.set('gradoAcademusoft', data.gradoAcademusoft);
    myParams.set('recibeInformacion', data.recibeInformacion);
    myParams.set('tipoInformacion', data.tipoInformacion);
    myParams.set('observacionCorreo', data.observacionCorreo);
    myParams.set('observacionesGenerales', data.observacionesGenerales);

    let options = new RequestOptions({ headers: headers, params: myParams});

    return this.http.post(this.url+'saveInformacionControl',
                   myParams.toString(),
                   {headers : headers});

  }

  getProgramas(){
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.get(this.url+'getProgramas');
  }



}
