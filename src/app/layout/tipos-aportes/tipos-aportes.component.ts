import { AfterViewInit, Component, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {
    Validators,
    FormBuilder
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TiposAportesService } from '../../_services/tiposAportesService';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';

@Component({
  selector : 'app-facultades',
  templateUrl: './tipos-aportes.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./tipos-aportes.component.scss'],
  animations: [routerTransition()]
})

export class TiposAportesComponent implements OnInit, AfterViewInit{

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('mdlNotification') public modalNotification:NgbModal;


  //vaariables para la tabla
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  cellSelect:any;
  //------------------------

  modalRef:any;
  public url:string;


  message = '';
  messageValidation = '';
  closeResult: string;

  //MAPEO DE LOS ATRIBUTOS DEL FORMULARIO A CREAR
  idEdit:string ='';
  name:string = '';
  activo:string = '';

  constructor(private zone: NgZone, private modalService: NgbModal, private tipoRecService: TiposAportesService){


    this.idEdit = '';
    this.url = environment.urlServices;
    this.cellSelect = {
      id : ''
    }
    this.message = 'No se ha seleccionado una fila';


   }

   ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  someClickHandler(info: any): void {

    if(this.cellSelect.id !== info.idTipoAporte){
      this.cellSelect = {
        id : info.idTipoAporte
      }
      this.message =  info.nombre;
      this.idEdit = info.idTipoAporte;
    }
    else{
      this.cellSelect = {
        id : ''
      }
      this.message = 'no se ha seleccionado una fila';
      this.idEdit = '';
    }


  }



  ngOnInit():void{


    this.dtOptions = {
      ajax: this.url+'getTiposAporte',
      columns: [{
        title: 'ID',
        data: 'idTipoAporte',
        visible: false
      }, {
        title: 'Nombre',
        data: 'nombre'
      }, {
        title: 'Activo/Inactivo',
        data: 'activo',
        visible: false
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
      this.modalRef = this.modalService.open(content);
      if(action == 'edit'){

        if(this.idEdit != ''){
          let callBack = this.tipoRecService.getTipoAportesById(this.idEdit);
          callBack.subscribe(res => {
            let data = res.json();

            if(data.status && data.status === 'OK'){
              var tipoReco = data.data;
              this.idEdit = tipoReco.idTipoAporte;
              this.name = tipoReco.nombre;
              this.activo = tipoReco.activo

            }
          });
        }
        else{
          this.message ="Por favor seleccionar una fila para editar";
          this.modalRef.close();
          this.openNotification(this.message, 'error');
        }
      }


      this.modalRef.result.then((result) => {
        this.cleanForm();
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.cleanForm();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }

  saveForm(){

    if( this.name == '' || this.activo == ''){

      this.openNotification("Todos los campos son obligatorios","error");
    }else{

      let data = {
        idTipoAporte : this.idEdit,
        nombre: this.name,
        activo: this.activo,
      };
      let callBack = this.tipoRecService.saveTipoAportes(data);
      callBack.subscribe(res => {
          let data = res.json();

          let status = data.status;

          if(status == 'OK'){

            this.modalRef.close();
            this.openNotification("","succes");
            this.message = 'No se ha seleccionado una fila';
            this.rerenderTable()
          }
          else{
            this.messageValidation = 'Ocurrio un error al guardar el registro';

          }
      })
      this.rerenderTable();
    }
  }


  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          this.cleanForm();
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          this.cleanForm();
          return 'by clicking on a backdrop';
      } else {
          this.cleanForm();
          return  `with: ${reason}`;
      }
  }
  cleanForm(){
    //this.idEdit = "";
    this.name = "";
    this.activo ="";

  }



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
