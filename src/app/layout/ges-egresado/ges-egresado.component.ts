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
import * as $ from 'jquery';

@Component({
  selector : 'app-ges-egresado',
  templateUrl: './ges-egresado.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./ges-egresado.component.css'],
  animations: [routerTransition()]
})

export class GesEgresadoComponent implements OnInit, AfterViewInit{

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('mdlNotification') public modalNotification:NgbModal;


  //vaariables para la tabla
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  cellSelect:any;
  //------------------------

  modalRef:any;


  message = '';
  messageValidation = '';
  closeResult: string;

  //MAPEO DE LOS ATRIBUTOS DEL FORMULARIO A CREAR
  idEdit:string ='';



  constructor(private modalService: NgbModal, private egreService: EgresadosService){
    this.idEdit = '';
    this.cellSelect = {
      id : ''
    }
    this.message = 'No se ha seleccionado una fila';

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  someClickHandler(info: any): void {


    if(this.cellSelect.id !== info.id){
      this.cellSelect = {
        id : info.idFacultad //cambiar por el id del egresado
      }
      //SETEAMOS EN EN MODEL PARA QUE PASE MAS ADELANTE AL FORMULARIO DE EDITAR
      /*this.message =  info.name;
      this.idEdit = info.idFacultad;*/
    }
    else{
      this.cellSelect = {
        id : ''
      }
      this.message = 'no se ha seleccionado una fila';
      this.idEdit = '';
    }


  }


  ngOnInit(){

    //SETEAMOS LOS CAMPOS EN LA TABLA QUE VAMOS A MOSTRAR AL INICIO
    this.dtOptions = {
      ajax: 'http://localhost:8080/SIGEG-WEB/services/getEgresados',
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
  }


  open(content, action:string) {
    //REFERENCIA DEL Modal
    this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static' });

    //VALIDAMOS QUE ACCION VA A EJECUTAR EL MODAL
    /*if(action == 'edit'){ //SI ES EDITAR TRAIGA LA INFO

      if(this.idEdit != ''){
        let callBack = this.facService.getFacultadById(this.idEdit);
        callBack.subscribe(res => {
          let data = res.json();

          if(data.status && data.status === 'OK'){
            var facultad = data.data;
            this.idEdit = facultad.idFacultad;
            this.nameFac = facultad.nombre;
            this.abreviatura = facultad.abreviatura

          }
        });
      }
      else{
        this.message ="Por favor seleccionar una fila para editar";
        this.modalRef.close();
        this.openNotification(this.message, 'error');
      }
    }*/


    this.modalRef.result.then((result) => {
      this.cleanForm();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.cleanForm();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

//METO DE INGNICION PARA EMPREZAR A GUARDAR LA INFO DEL EGRESADO
saveForm(){


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

  //METODOS PARA EL FORMULARIO PASO A PASO
  onComplete($event){
    this.modalRef.close();
  }


//METODO PARA LIMPIAR LA INFORMACION DE LOS FORMULARIOS CREADOS
cleanForm(){


}

//METODO QUE RECARGA LA TABLA
rerenderTable(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    this.idEdit = "";
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
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
