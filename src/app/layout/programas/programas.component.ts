import { AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProgramasService } from '../../_services/programasService';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';


interface Facultad {
  idFacultad:string;
  nombre:string;
  abreviatura:string;


};


@Component({
  selector : 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls:['./programas.component.scss'],
  animations: [routerTransition()]
})



export class ProgramasComponent implements OnInit, AfterViewInit{

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild('mdlNotification')
  public modalNotification:NgbModal;

  dtTrigger: Subject<any> = new Subject();
  modalRef:any;
  public url:string;

  message = '';
  messageValidation = '';
  idEdit:string='';
  namePro:string;
  descripPro:string;

  facultadId:string;
  facultadName:string;
  cellSelect:any;
  dtOptions: any = {};
  closeResult: string;
  listFacultad:Facultad[];
  txtFacultad:string;

  constructor(private zone: NgZone, private modalService: NgbModal, private facService: ProgramasService, private route: ActivatedRoute){
    this.route.params.subscribe(res => console.log(res));
    this.facultadId =
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
    console.log(info);
    console.log(this.cellSelect);

    this.cellSelect = {
      id : info.id
    }
    this.message =  info.name;
    this.idEdit = info.idPrograma;
    /*if(this.cellSelect.id !== info.id){
      this.cellSelect = {
        id : info.id
      }
      this.message =  info.name;
      this.idEdit = info.idPrograma;

    }
    else{
      this.cellSelect = {
        id : ''
      }
      this.message = 'no se ha seleccionado una fila';
      this.idEdit = '';
    }*/


  }

  someClickHandlerProg(info: any): void {
    console.log(info);
  }



  ngOnInit():void{
    this.dtOptions = {
      //ajax: this.url+'getProgramasByFacultad?idFacultad='+this.idEdit,
      ajax: this.url+'getProgramas',

      columns: [{
        title: 'ID',
        data: 'idPrograma',
        visible: false
      }, {
        title: 'Nombre',
        data: 'nombre'
      }],
      rowCallback:(row: Node, data: any[] | Object, index: number) => {
         const self = this;
         $('td', row).unbind('click');
         $('td', row).bind('click', () => {
           self.someClickHandler(data);
         });
         console.log(row);
         return row;
      },
      select:{
            style: 'single'
      },
      "language": {
           "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
       }
    };

    this.getFacultades();
  }

//ARREGLAR PARA PROGRAMAS !!!!!!!!!!!!!!!!!!
  open(content, action:string) {
  console.log("sfsfds");
      if(action == 'edit'){
        console.log("valor edit"+this.idEdit);

        if(this.idEdit != '' && this.idEdit != null){
          console.log("ingreso")
          let callBack = this.facService.getProgramaById(this.idEdit);
          callBack.subscribe(res => {
            let data = res.json();
            console.log(data);
            if(data.status && data.status === 'OK'){
              var programa = data.data;
              this.idEdit = programa.idPrograma;
              this.namePro = programa.nombre;
              this.descripPro = programa.abreviatura;
              this.txtFacultad=programa.idFacultad;
            }
          });
        } else{
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
    debugger;
    if( (this.namePro == '' || this.namePro == undefined ) || (this.descripPro == '' || this.descripPro== undefined) || (this.txtFacultad =='' || this.txtFacultad == undefined)){
        this.openNotification("Todos los campos son obligatorios","error");
    }else{

      let data = {
        id : (this.idEdit==null|| this.idEdit=='' ?'':this.idEdit) ,
        nombre: this.namePro ,
        descripcion: this.descripPro,
        idFacultad:this.txtFacultad,
      };
      let callBack = this.facService.savePrograma(data); //editar para programas !!!!!!!!
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
    this.openNotification(mensaje,"info");
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
    this.namePro = "";
    this.descripPro = "";
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

  getFacultades(){
    let callBack = this.facService.getFacultades(); //editar para programas !!!!!!!!
    callBack.subscribe(res => {
        let data = res.json();

        let status = data.status;

        if(status == 'OK'){
          this.listFacultad = data.data as  Facultad[];
        }
        else{
        //  this.openNotification('Error al obtener los programas:'+data.message, 'error');

        }


    });
  }
  titleNotification:string;
  messageNotification:string;
  iconNotification:string;
  colorAlert:string;

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
