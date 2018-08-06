import {AfterViewInit, Component, NgZone, OnInit,ViewChild, ChangeDetectorRef, ViewEncapsulation, OnDestroy} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { EgresadosService } from '../../_services/egresadosService';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

interface Programa {
  idPrograma:string;
  idFacultad:string;
  nombre:string;
  abreviatura:string;
}

@Component({
    selector: 'app-blank-page',
    templateUrl: './rep-egre-programa.component.html',
    styleUrls: ['./rep-egre-programa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [routerTransition()]
})
export class ReporteEgreProgComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild('mdlNotification') public modalNotification:NgbModal;
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalRef:any;
  modalRefRepoEgresados:any;

  listProgramas:Programa[];


  idProgramaTex:any = "0";

  dataTable: any;

  public url:string;

    constructor(private zone: NgZone, private modalService: NgbModal, private egreService: EgresadosService, private chRef: ChangeDetectorRef) {
      this.url = environment.urlServices;
    }

    ngOnInit(): void {
      this.getProgramas();

      this.dtOptions = {
        pagingType: 'full_numbers'
      };
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
          //  this.openNotification('Error al obtener los programas:'+data.message, 'error');

          }
      },
      error=>{

        //this.openNotification('Error del servidor: '+error, 'error');
      });

    }

    buscar(){

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.redrawTable();
    }
    redrawTable(){
      this.dtOptions = {
        ajax:{
          url:this.url+'getEgresadosXPrograma',
          type:'POST',
          data:{
            idPrograma:this.idProgramaTex,
          }
        },
        columns: [{
          title: 'ID',
          data: 'id',
          visible: false
        }, {
          title: 'Cod. Estudiante',
          data: 'identificacion'
        },{
          title: 'Apellidos',
          data: 'apellidos'
        }, {
          title: 'Nombres',
          data: 'nombres'
        },
        {
          title: 'Telefono Fijo',
          data: 'telefonoFijo'
        },
        {
          title: 'Telofono Movil',
          data: 'telefonoMovil'
        },
        {
          title: 'Corre electronico',
          data: 'correoElectronico'
        }],
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [
          'excel'
        ]
      };
      setTimeout(()=>{
        this.dtTrigger.next()
      });
    }

    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
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
