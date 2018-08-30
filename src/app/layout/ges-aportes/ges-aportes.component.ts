import { AfterViewInit, Component, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {
    Validators,
    FormBuilder,
    ReactiveFormsModule,
    FormControl
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TiposAportesService } from '../../_services/tiposAportesService';
import { AporteService } from '../../_services/aporteService';
import { Aporte } from './aportes';
import { AporteEgresado } from './aportes';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';

interface TipoAporte {
    idTipoAporte:string;
    nombre:string;
}

interface Egresado{
  idEgresado:string,
  nombres:string,
  apellidos:string
}

@Component({
  selector : 'app-facultades',
  templateUrl: './ges-aportes.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./ges-aportes.component.scss'],
  animations: [routerTransition()]
})

export class GesAporteComponent implements OnInit, AfterViewInit{

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('mdlEgresados') public mdlEgresadoAporte:NgbModal;
  @ViewChild('mdlNotification') public modalNotification:NgbModal;


  //vaariables para la tabla
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  cellSelect:any;
  //------------------------

  modalRef:any;
  public url:string;

  //----------------
  //varables para realizar el Buscar
  tipoDocToFind:string ="";
  numeroDocToFind:string ="";


  message = '';
  messageValidation = '';
  closeResult: string;

  //MAPEO DE LOS ATRIBUTOS DEL FORMULARIO A CREAR
  tipoAporteInterface : TipoAporte;
  aporte: Aporte;
  aporteEgresadoModel: AporteEgresado;
  lisEgresadosAportes: AporteEgresado[];
  listTipoAporte: TipoAporte[];
  listEgresado: Egresado[] = [];
  //archivoa cargar
  fileUpload:string|any;


  idEdit:string ='';


  constructor(private zone: NgZone, private modalService: NgbModal,
    private tipoAporteService: TiposAportesService, private aporteSrvice: AporteService){

    this.aporte = new Aporte();
    this.aporteEgresadoModel = new AporteEgresado();
    this.idEdit = '';
    this.url = environment.urlServices;
    this.cellSelect = {
      id : ''
    }
    this.message = 'No se ha seleccionado una fila';
    this.getTiposReconocimiento();

   }

   ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  someClickHandler(info: any): void {

    if(this.cellSelect.id !== info.idAporteInvestigacion){
      this.cellSelect = {
        id : info.idAporteInvestigacion
      }
      this.message =  info.nombreProyecto;
      this.idEdit = info.idAporteInvestigacion;
    }
    else{
      this.cellSelect = {
        id : ''
      }
      this.message = 'no se ha seleccionado una fila';
      this.idEdit = '';
    }


  }

  getTiposReconocimiento(){
    let callBack = this.tipoAporteService.getTiposAportes();
    callBack.subscribe(res => {

        let data = res.json();
        let status = data.status;

        if(status == 'OK'){

          this.listTipoAporte = data.data as TipoAporte[];

        }
        else{
          this.openNotification('Error al obtener los tipos de aportes:'+data.message, 'error');

        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });

  }


  ngOnInit():void{
    this.dtOptions = {
      ajax: this.url+'getAportes',
      columns: [{
        title: 'ID',
        data: 'idAporteInvestigacion',
        visible: false
      },{
        title: 'Nombre Proyecto',
        data: 'nombreProyecto'
      }, {
        title: 'Descripcion',
        data: 'descripcionProyecto'
      },{
        title: 'Persona a Cargo',
        data: 'personaACargo'
      },{
        title: 'Grupo Beneficiarios',
        data: 'grupoBeneficiario'
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

  open(content, size:string) {


          this.aporte = new Aporte();
          this.modalRef = this.modalService.open(content);
          this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
  }

  openModalReconoEgresado(){
    if(this.idEdit == '' || this.idEdit == null || this.idEdit == undefined){
      this.openNotification('Se debe seleccionar un elemento de la tabla', 'error');
    }
    else{
      this.getEgresadosRegistrados();
      this.modalRef = this.modalService.open(this.mdlEgresadoAporte,{windowClass: 'bigModal'});

    }

  }
//metodo que lista los egresados registrados al aporte seleccionado
  getEgresadosRegistrados(){
    let callBack = this.aporteSrvice.getEgresadosAportes(this.idEdit);
    callBack.subscribe(res => {
        let data = res.json();
        let status = data.status;

        if(status == 'OK'){
          this.lisEgresadosAportes = [];
          this.lisEgresadosAportes = data.data as AporteEgresado[];

        }
        else{
          this.openNotification('Error al obtener los egresados registrados al aporte:'+data.message, 'error');

        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });
  }

  //al dar click en el egresado aporte Listado
  //traemos su informacion para mostrarla en el formulario de la izquierda
  getInfoEgresadoReconocimiento(idEgresadoAporte:string, nombres:string, apellidos:string){

    let callBack = this.aporteSrvice.getEgresadoAporteById(idEgresadoAporte);
    callBack.subscribe(res => {
        let data = res.json();
        let status = data.status;
        if(status == 'OK'){

          this.aporteEgresadoModel = data.data as AporteEgresado;
          this.aporteEgresadoModel.nombreEgresado = nombres;
          this.aporteEgresadoModel.apellidosEgresado= apellidos;
        }
        else{
          this.openNotification('Error al obtener los egresados registrados al aporte:'+data.message, 'error');
        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });



  }
  //metodo que registra los egresados al aporte
  registrarEgresadoAlEvento(){
    this.aporteEgresadoModel.idAporteInvestigacion = this.idEdit;
    let callBack = this.aporteSrvice.registrarEgresadoAlAporte(this.aporteEgresadoModel);
    callBack.subscribe(res => {
        let data = res.json();
        let status = data.status;
        if(status == 'OK'){
          this.getEgresadosRegistrados();
          this.openNotification('', 'succes');
        }
        else{
          this.openNotification('Error al obtener los egresados registrados al aporte:'+data.message, 'error');
        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });

  }
  //metodo que elimina
  eliminarEgresadoDelEvento(idEgresadoAporte:string){

    let callBack = this.aporteSrvice.deleteEgresadoAporte(idEgresadoAporte);
    callBack.subscribe(res => {
        let data = res.json();
        let status = data.status;
        if(status == 'OK'){


          this.getEgresadosRegistrados();


        }
        else{
          this.openNotification('Error al obtener los egresados registrados al aporte:'+data.message, 'error');
        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });
  }

  cleanEgreRecoForm(){
    this.aporteEgresadoModel = new AporteEgresado();
    this.tipoDocToFind = "";
    this.numeroDocToFind ="";
  }

  saveForm(){

    let callBack = this.aporteSrvice.saveAporte(this.aporte);
    callBack.subscribe(res => {

        let data = res.json();
        let status = data.status;

        if(status == 'OK'){
          this.aporte.idAporteInvestigacion = data.data;
          this.openNotification('Registro exitoso','succes');
          this.rerenderTable();
          this.modalRef.close()

        }
        else{
          this.openNotification('Error del servidor al guardar la informacion basica:'+data.message, 'error');

        }
    },
    error=>{

      this.openNotification('Error del servidor: '+error, 'error');
    });
  }

  getReconocimientoById(content){

    if(this.idEdit == '' || this.idEdit == null || this.idEdit == undefined){
      this.openNotification('Se debe seleccionar un elemento de la tabla', 'error');
    }
    else{

        let callBack = this.aporteSrvice.getAporteById(this.idEdit);
        callBack.subscribe(res => {

            let data = res.json();
            let status = data.status;

            if(status == 'OK'){
              this.aporte = data.data as Aporte;
              this.modalRef = this.modalService.open(content);
            }
            else{
              this.openNotification('Error del servidor al guardar la informacion basica:'+data.message, 'error');

            }
        },
        error=>{

          this.openNotification('Error del servidor: '+error, 'error');
        });

      /*  this.modalRef.result.then((result) => {
          this.cleanForm();
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.cleanForm();
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });*/

    }


  }
  //buscamos el egresado por el tipo y numero de documento
  getEgresadoByDocument(){
    if(this.tipoDocToFind == '' || this.numeroDocToFind == ''){
      this.openNotification('Error de validacion: se debe seleccionar un tipo y un numero de documento', 'error');
    }else{

      let callBack = this.aporteSrvice.getEgresadoByDocument(this.tipoDocToFind,this.numeroDocToFind);
      callBack.subscribe(res => {

          let data = res.json();
          let status = data.status;

          if(status == 'OK'){

            if(data.data.length > 0){
              let newEgresado = data.data[0];
              this.aporteEgresadoModel.idEgresado = newEgresado.idEgresado;
              this.aporteEgresadoModel.nombreEgresado = newEgresado.nombres;
              this.aporteEgresadoModel.apellidosEgresado = newEgresado.apellidos;
            }
            else{
              this.openNotification('No se encontro un egresado con el tipo y numero de documento','info');
            }


          }
          else{
            this.openNotification('Error al obtener el egresado, consultar con el administrador:'+data.message, 'error');

          }
      },
      error=>{

        this.openNotification('Error del servidor: '+error, 'error');
      });
    }

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
  cleanForm(){
    this.idEdit = "";

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
