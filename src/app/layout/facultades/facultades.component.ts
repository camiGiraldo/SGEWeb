import { AfterViewInit, Component, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FacultadesService } from '../../_services/facultadesService';
import * as $ from 'jquery';

@Component({
  selector : 'app-facultades',
  templateUrl: './facultades.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./facultades.component.css'],
  animations: [routerTransition()]
})

export class FacultadesComponent implements OnInit, AfterViewInit{

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('mdlNotification') public modalNotification:NgbModal;

  //vaariables para la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  cellSelect:any;
  //------------------------

  modalRef:any;


  message = '';
  messageValidation = '';
  idEdit:string;
  nameFac:string;
  directorFac:string;
  descripFac:string;




  closeResult: string;

  constructor(private zone: NgZone, private modalService: NgbModal, private facService: FacultadesService){
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
        id : info.id
      }
      this.message =  info.name;
      this.idEdit = info.id;
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
      ajax: 'http://localhost:8080/SGE-WEB/services/getFacultades',
      columns: [{
        title: 'ID',
        data: 'id',
        visible: false
      }, {
        title: 'Nombre',
        data: 'name'
      }, {
        title: 'Director',
        data: 'director'
      }, {
        title: 'Descripción',
        data: 'descripcion'
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

      if(action == 'edit'){
        if(this.idEdit != ''){
          let callBack = this.facService.getFacultadById(this.idEdit);
          callBack.subscribe(res => {
            let data = res.json();

            if(data.status && data.status === 'OK'){
              var facultad = data.data;
              this.idEdit = facultad.id;
              this.nameFac = facultad.name;
              this.directorFac = facultad.director
              this.descripFac = facultad.descripcion;
            }
          });
        }
        else{
          this.message ="POR FAVOR SELECCIONAR UNA FILA PARA EDITAR";
        }
      }

      this.modalRef = this.modalService.open(content);
      this.modalRef.result.then((result) => {
        this.cleanForm();
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.cleanForm();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }

  saveFomr(){

    if( this.nameFac == '' || this.directorFac == '' || this.descripFac == ''){

      this.openNotification("Todos los campos son obligatorios","error");
    }else{

      let data = {
        id : this.idEdit,
        nombre: this.nameFac,
        director: this.directorFac,
        descripcion: this.descripFac
      };
      let callBack = this.facService.saveFacultad(data);
      callBack.subscribe(res => {
          let data = res.json();

          let status = data.status;

          if(status == 'OK'){

            this.modalRef.close();
            this.openNotification("","succes");
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
    this.nameFac = "";
    this.directorFac ="";
    this.descripFac = "";
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
    this.modalService.open(this.modalNotification, { windowClass: classBox});

  }

}
