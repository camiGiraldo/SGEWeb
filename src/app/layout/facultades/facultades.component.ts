import { AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FacultadesService } from '../../_services/facultadesService';
import * as $ from 'jquery';

@Component({
  selector : 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls:['./facultades.component.css'],
  animations: [routerTransition()]
})

export class FacultadesComponent implements OnInit, AfterViewInit{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  dtTriggerProg : Subject<any> = new Subject();
  modalRef:any;
  modalRefProg:any;

  message = '';
  messageValidation = '';
  idEdit:string;
  nameFac:string;
  directorFac:string;
  descripFac:string;

  cellSelect:any;
  dtOptions: any = {};
  dtOptionsProg : any ={};
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
    this.dtTriggerProg.next();
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

  someClickHandlerProg(info: any): void {
    console.log(info);
  }



  ngOnInit():void{
    this.dtOptions = {
      ajax: 'http://192.168.1.66:8080/SGE-WEB/services/getFacultades',
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

  createTablePrograms(){
    debugger
    if(this.idEdit == '')
    {

      alert('Se debe seleccionar una facultad');

    }
    else{

      this.dtOptionsProg = {
        ajax: 'http://192.168.1.66:8080/SGE-WEB/services/getProgramasByFacultad?idFacultad='+this.idEdit,

        columns: [{
          title: 'ID',
          data: 'id',
          visible: false
        }, {
          title: 'Nombre',
          data: 'nombre'
        }],
        rowCallback:(row: Node, data: any[] | Object, index: number) => {
           const self = this;
           $('td', row).unbind('click');
           $('td', row).bind('click', () => {
             self.someClickHandlerProg(data);
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


  }

  openFacultades(contentProg, action:string){

    this.createTablePrograms();

    this.modalRefProg = this.modalService.open(contentProg);
    this.modalRefProg.result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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
      this.messageValidation = 'Todos los campos son obligatorios';
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
            this.messageValidation = 'Registro exitoso';
            this.alertMessage(this.messageValidation);
            this.modalRef.close();
          }
          else{
            this.messageValidation = 'Ocurrio un error al guardar el registro';
            this.alertMessage(this.messageValidation);
          }
      })
      this.rerenderTable();

    }
  }
//muestra mensajes de alertas
  alertMessage(mensaje:string){
    alert(mensaje);
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

}
