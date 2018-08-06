import {AfterViewInit, Component, NgZone, OnInit,ViewChild,  ViewEncapsulation} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EgresadosService } from '../../_services/egresadosService';
import { Egresados } from './egresados'
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';


interface Programa {
  idPrograma:string;
  idFacultad:string;
  nombre:string;
  abreviatura:string;
}

@Component({
  selector : 'app-ges-egresado',
  templateUrl: './ges-egresado.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./ges-egresado.component.scss'],
  animations: [routerTransition()]
})


export class GesEgresadoComponent implements OnInit, AfterViewInit{

  @ViewChild(DataTableDirective) dtElement: DataTableDirective; //create una directiva verifica donde llama eso
  @ViewChild('mdlNotification') public modalNotification:NgbModal;
  @ViewChild('content') public modalForm:NgbModal;



  //vaariables para la tabla
  dtOptions: any;
  dtOptionsPrograms: any;
  dtTrigger: Subject<any> = new Subject();
  dtTriggerPrograms: Subject<any> = new Subject();
  cellSelect:any;
  //------------------------

  modalRef:any;
  public url:string;



  message = '';
  messageValidation = '';
  closeResult: string;

  //MAPEO DE LOS ATRIBUTOS DEL FORMULARIO A CREAR
  egresado:Egresados;
  programa:Programa;
  idEdit:string ='';
  listProgramas:Programa[];
  listProgramasEgresado= [];



  constructor(private modalService: NgbModal, private egreService: EgresadosService){

    this.egresado = new Egresados();
    this.url = environment.urlServices;
    this.idEdit = '';
    this.cellSelect = {
      id : ''
    }
    this.message = 'No se ha seleccionado una fila';

    this.getProgramas();

  }

  getProgramas(){
    let callBack = this.egreService.getProgramas();
    callBack.subscribe(res => {

        let data = res.json();
        let status = data.status;

        if(status == 'OK'){
          this.listProgramas = data.data as Programa[];
          console.log('listado', this.listProgramas);
        }
        else{
          this.openNotification('Error al obtener los programas:'+data.message, 'error');

        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtTriggerPrograms.next();

  }

  someClickHandler(info: any): void {


    if(this.cellSelect.id !== info.idEgresado){
      this.cellSelect = {
        id : info.idEgresado //cambiar por el id del egresado
      }

      //SETEAMOS EN EN MODEL PARA QUE PASE MAS ADELANTE AL FORMULARIO DE EDITAR
      this.message =  info.identificacion+"-"+info.nombres+" "+info.apellidos;

      this.idEdit = info.idEgresado;
      this.getInfoEgresadoById(this.idEdit);
    }
    else{
      this.cellSelect = {
        id : ''
      }
      this.message = 'no se ha seleccionado una fila';
      this.idEdit = '';
    }


  }

  onClickProgram(idPrograma){
    this.egresado.idInformacionAcademica = this.egresado.InformacionAcademica[idPrograma].idInformacionAcademica;
    this.egresado.idPrograma = this.egresado.InformacionAcademica[idPrograma].idPrograma;
    this.egresado.libro = this.egresado.InformacionAcademica[idPrograma].libro;
    this.egresado.folio = this.egresado.InformacionAcademica[idPrograma].folio;
    this.egresado.acta = this.egresado.InformacionAcademica[idPrograma].acta;
    this.egresado.numeroDiploma = this.egresado.InformacionAcademica[idPrograma].numeroDiploma;
    this.egresado.semestreGrado = this.egresado.InformacionAcademica[idPrograma].semestreGrado;
    this.egresado.formaGrado = this.egresado.InformacionAcademica[idPrograma].formaGrado;
    this.egresado.tipoOpcionGrado = this.egresado.InformacionAcademica[idPrograma].tipoOpcionGrado;
    this.egresado.notaOpcionGrado = this.egresado.InformacionAcademica[idPrograma].notaOpcionGrado;
    this.egresado.semestreFinalizoMaterias = this.egresado.InformacionAcademica[idPrograma].semestreFinalizoMaterias;
  }

  cleanInfoProgram(){
    this.egresado.idInformacionAcademica = '';
    this.egresado.libro = '';
    this.egresado.folio = '';
    this.egresado.acta = '';
    this.egresado.numeroDiploma = '';
    this.egresado.semestreGrado = '';
    this.egresado.formaGrado = '';
    this.egresado.tipoOpcionGrado = '';
    this.egresado.notaOpcionGrado = '';
    this.egresado.semestreFinalizoMaterias = '';
  }

  //Metodos del  wizard
  onStep1Next(){

    console.log(this.egresado);
  }

  onStep2Next(){

    console.log(this.egresado);
  }

  //METODOS PARA EL FORMULARIO PASO A PASO
  onComplete(){
    console.log(this.egresado);
    this.saveForm();

  }



  //METO DE INGNICION PARA EMPREZAR A GUARDAR LA INFO DEL EGRESADO
  saveForm(){
      let callBack = this.egreService.saveInfoBasic(this.egresado);
      callBack.subscribe(res => {

          let data = res.json();
          let status = data.status;

          if(status == 'OK'){
            this.egresado.idEgresado = data.data;
            this.saveFormControl(this.egresado);
          }
          else{
            this.openNotification('Error del servidor al guardar la informacion basica:'+data.message, 'error');

          }
      },
      error=>{

        this.openNotification('Error del servidor: '+error, 'error');
      });

  }
  saveFormAcademic(){
    let callBack = this.egreService.saveInfoAcademic(this.egresado);
    callBack.subscribe(res => {

        let data = res.json();
        let status = data.status;

        if(status == 'OK'){
          this.openNotification("","succes");
          var newProgram = {idPrograma:this.egresado.idPrograma, nombre: '', abreviatura: '', idFacultad: ''};
            for(var j = 0, leng = this.listProgramas.length; j < leng; j++){
              if(parseInt(this.egresado.idPrograma) === parseInt(this.listProgramas[j].idPrograma)){
                newProgram.nombre = this.listProgramas[j].nombre;
                newProgram.abreviatura = this.listProgramas[j].abreviatura;
                newProgram.idFacultad = this.listProgramas[j].idFacultad;
              }
            }
            this.listProgramasEgresado.push(newProgram);
            this.cleanInfoProgram();
        }
        else{
          this.openNotification('Error del servidor al guardar la informacion academica:'+data.message, 'error');
        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });

  }

  saveFormControl(data:any){
    let callBack = this.egreService.saveInfoControl(this.egresado);
    callBack.subscribe(res => {

        let data = res.json();
        let status = data.status;
        if(status == 'OK'){
          this.modalRef.close();
          this.openNotification("","succes");
        }
        else{
          this.openNotification('Error del servidor al guardar la informacion de control: '+data.message, 'error');
        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });
  }

  onClickDeleteProgram(event){
    var target = event.target;
    var parent = target.parentNode;
    if(confirm('Est\u00E1 seguro que desea eliminar el programa del egresado?')){
      parent.parentNode.removeChild(parent);
      this.cleanInfoProgram();
    }
  }

/*Metodo para editar un egresado en el cual priimero traemos la info y despues abrimos el modal bindeando la info*/
  editEgresado(){


      if(this.idEdit != ''){
        this.modalRef = this.modalService.open(this.modalForm, { size: 'lg', backdrop: 'static' });

      }
      else{
        this.message ="Por favor seleccionar una fila para editar";
        this.modalRef.close();
        this.openNotification(this.message, 'error');
      }

  }

  onChangeIdPrograma(){
    var existe = false;
    for(var info in this.egresado.InformacionAcademica){
      if(parseInt(this.egresado.idPrograma) === parseInt(info)){
        existe = true;
      }
    }
    if(!existe){
      this.cleanInfoProgram();
    }else{
      this.onClickProgram(this.egresado.idPrograma);
    }
  }

  getInfoEgresadoById(idEgresado:string){

    let data = {
      idEgresado : idEgresado
    };
    let callBack = this.egreService.getEgresadoById(data);
    callBack.subscribe(res => {

        let data = res.json();
        let status = data.status;
        if(status == 'OK'){
          this.egresado = new Egresados();
          let infoBasica    =  data.data.Egresado;
          let arrayInfoAcademica =  data.data.InformacionAcademica;
          let infoControl   = data.data.InformacionControl[0];
          /*Seteamos la informacion basica, academica y de control*/
          this.egresado.idEgresado = infoBasica.idEgresado;
          this.egresado.nombres = infoBasica.nombres;
          this.egresado.apellidos = infoBasica.apellidos;
          this.egresado.tipoIdentificacion = infoBasica.tipoIdentificacion;
          this.egresado.identificacion = infoBasica.identificacion;
          this.egresado.ciudadExpedicion = infoBasica.ciudadExpedicion;
          this.egresado.paisResidencia = infoBasica.paisResidencia;
          this.egresado.ciudadResidencia = infoBasica.ciudadResidencia;
          this.egresado.direccionResidencia = infoBasica.direccionResidencia;
          this.egresado.telefonoFijo = infoBasica.telefonoFijo;
          this.egresado.telefonoMovil = infoBasica.telefonoMovil;
          this.egresado.telefonoMovilAlterno = infoBasica.telefonoMovilAlterno;
          this.egresado.correoElectronico = infoBasica.correoElectronico;
          this.egresado.correoElectronicoAlterno = infoBasica.correoElectronicoAlterno;
          this.egresado.InformacionAcademica = {};

          this.listProgramasEgresado = [];

          for(var i = 0, len = arrayInfoAcademica.length; i < len; i++){
            var infoAcademica = arrayInfoAcademica[i];
            this.egresado.InformacionAcademica[infoAcademica.idPrograma] = infoAcademica;
            var newProgram = {idPrograma:infoAcademica.idPrograma, nombre: '', abreviatura: '', idFacultad: ''};
            for(var j = 0, leng = this.listProgramas.length; j < leng; j++){
              if(parseInt(infoAcademica.idPrograma) === parseInt(this.listProgramas[j].idPrograma)){
                newProgram.nombre = this.listProgramas[j].nombre;
                newProgram.abreviatura = this.listProgramas[j].abreviatura;
                newProgram.idFacultad = this.listProgramas[j].idFacultad;
              }
            }
            this.listProgramasEgresado.push(newProgram);
          }

          /*this.egresado.idInformacionAcademica = infoAcademica.idInformacionAcademica;
          this.egresado.idPrograma = infoAcademica.idPrograma;
          this.egresado.libro = infoAcademica.libro;
          this.egresado.folio = infoAcademica.folio;
          this.egresado.acta = infoAcademica.acta;
          this.egresado.numeroDiploma = infoAcademica.numeroDiploma;
          this.egresado.semestreGrado = infoAcademica.semestreGrado;
          this.egresado.formaGrado = infoAcademica.formaGrado;
          this.egresado.tipoOpcionGrado = infoAcademica.tipoOpcionGrado;
          this.egresado.notaOpcionGrado = infoAcademica.notaOpcionGrado;
          this.egresado.semestreFinalizoMaterias = infoAcademica.semestreFinalizoMaterias;*/

          console.log('Prueba------', this.egresado);
          console.log('Prueba------2', this.listProgramasEgresado);

        }
        else{
          this.openNotification('Error del servidor al guardar la informacion basica: '+data.message, 'error');

        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });
  }

  //METODO PARA LIMPIAR LA INFORMACION DE LOS FORMULARIOS CREADOS
  cleanForm(){
    this.egresado = new Egresados();

  }


  ngOnInit(){
    //SETEAMOS LOS CAMPOS EN LA TABLA QUE VAMOS A MOSTRAR AL INICIO
    this.dtOptions = {
      ajax: this.url+'getEgresados',
      columns: [{
        title: 'ID',
        data: 'idEgresado',
        visible: false
      }, {
        title: 'No. Identificacion',
        data: 'identificacion'
      }, {
        title: 'Nombres',
        data: 'nombres'
      }, {
        title: 'Apellidos',
        data: 'apellidos'
      }, {
        title: 'Correo Electronico',
        data: 'correoElectronico'
      }],
      rowCallback:(row: Node, data: any[] | Object, index: number) => {
         const self = this;
         $('td', row).unbind('click');
         $('td', row).bind('click', () => {
           self.someClickHandler(data);
         });
         return row;
      },
      select:{
            style: 'single'
      },
      "language": {
           "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
       }
    };
    /*this.dtOptionsPrograms = {
      ajax: this.url+'getEgresados',
      columns: [{
        title: 'ID',
        data: 'idEgresado',
        visible: false
      }, {
        title: 'No. Identificacion',
        data: 'identificacion'
      }, {
        title: 'Nombres',
        data: 'nombres'
      }, {
        title: 'Apellidos',
        data: 'apellidos'
      }, {
        title: 'Correo Electronico',
        data: 'correoElectronico'
      }],
      rowCallback:(row: Node, data: any[] | Object, index: number) => {
         const self = this;
         $('td', row).unbind('click');
         $('td', row).bind('click', () => {
           self.someClickHandler(data);
         });
         return row;
      },
      select:{
            style: 'single'
      },
      "language": {
           "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
       }
    };*/
  }

  setProgramData(){
    this.dtTriggerPrograms.next();
  }




  open(content, action:string, windowClass:string) {

          this.setProgramData();
    //REFERENCIA DEL Modal
    var windowClassModal = (windowClass != undefined) ? windowClass : 'lg';
    this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', windowClass: windowClassModal });
    this.modalRef.result.then((result) => {
      this.cleanForm();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.cleanForm();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }




private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }



//METODO QUE RECARGA LA TABLA
rerenderTable(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    this.idEdit = "";
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
    this.dtTriggerPrograms.next();
  });
}

//SECCION DE  NOTIFICACIONES
//AUTOR: CAMILO GIRALDO 2018
//variables para los mensajes de notificacion
titleNotification:string;
messageNotification:string;
iconNotification:string;
colorAlert:string;
//-------------------------------------------
//METODO PARA ABRIR EL MODAL DE LA NOTIFICACION
openNotification(messageComplement:string, type:string){


  let titleNot:string;
  let firstMessage:string;
  let classBox:string;
  let classIcon;
  let colorIcon;

  switch (type){
    case 'succes':
      titleNot = "Confirmación";
      firstMessage ="Registro exitoso.";
      classIcon = "fa fa-check-square-o";
      colorIcon = "green";
      classBox = "succes-msg";
    break;
    case 'info':
      titleNot = "Información";
      firstMessage ="";
      classIcon ="fa fa-exclamation-triangle";
      colorIcon = "#b0b01a";
      classBox = "info-msg";
    break;
    case 'error':
      titleNot = "Error";
      firstMessage ="Opps! ";
      classIcon ="fa fa-times";
      colorIcon="red";
      classBox = "error-msg";
    break;
  }

  this.titleNotification =titleNot;
  this.messageNotification = firstMessage + messageComplement;
  this.iconNotification = classIcon;
  this.colorAlert = colorIcon;
  this.modalService.open(this.modalNotification, { windowClass: classBox });

  }

}

export class data {
  public email:string;
}
