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
import { EventosService } from '../../_services/eventosService';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';
/*import {Observable} from 'rxjs/Observable';*/

interface Facultad {
  idFacultad:string;
  nombre:string;
  abreviatura:string;


};

interface TipoEvento{
  idTipoEvento:string;
  idCategoriaEvento:string;
  nombre:string;
  activo:string;
}

interface EventoObj{
  idEvento:string,
  idTipoEvento:string,
  nombre:string;
  fechaInicio:string,
  fechaFin:string;
  lugar:string;
  horaInicio:string,
  duracionEstimada:string;
  costoEgresado:string,
  costoUniajc:string;
  certificable:string,
  dependenciaOrganiza:string;
  dependenciaBeneficiaria:string,
  comunidadBeneficiaria:string,
  personaACargo:string,
  correoElectronico:string;
  telefono:string,
  cuposEgresados:string;
  bannerEvento:string,
  urlInscripcion:string;
  adjunto:string;
  soporte:string;
}
interface Egresados{
  idAsistenciaEvento:string;
  nombres:string;
  apellidos:string;
  idEgresado:string;
  inscrito:string;
  asistio:string;
  aprobo:string;
  idEvento:string;

}
@Component({
    selector: 'app-blank-page',
    templateUrl: './ges-eventos.component.html',
    styleUrls: ['./ges-eventos.component.scss'],
    animations: [routerTransition()]
})
export class GesEventosComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild('mdlNotification')
  public modalNotification:NgbModal;
  dtTrigger: Subject<any> = new Subject();
  modalRef:any;
  public url:string;
//fileUploads: Observable<string[]>
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
  listTipoEventos:TipoEvento[];
  listEgresados:Egresados[];
  egresadosSave:Egresados;
  eventos:EventoObj;
  txtFacultad:string;
  evento:EventoObj;
  duracionEstimada:string;
  cbotipoduracion:string;
  urlExterna:string;

  constructor(private zone: NgZone, private modalService: NgbModal, private facService: EventosService, private route: ActivatedRoute){
    this.route.params.subscribe(res => console.log(res));
    this.facultadId =
    this.idEdit = '';
    this.url = environment.urlServices;
    this.duracionEstimada='';
    this.cbotipoduracion='';
    this.urlExterna='';
    this.cellSelect = {
      id : ''
    }
    this.message = 'No se ha seleccionado una fila';
    this.evento={idEvento:'',
    idTipoEvento:'',
    nombre:'',
    fechaInicio:'',
    fechaFin:'',
    lugar:'',
    horaInicio:'',
    duracionEstimada:'',
    costoEgresado:'',
    costoUniajc:'',
    certificable:'',
    dependenciaOrganiza:'',
    dependenciaBeneficiaria:'',
    comunidadBeneficiaria:'',
    personaACargo:'',
    correoElectronico:'',
    telefono:'',
    cuposEgresados:'',
    bannerEvento:'',
    urlInscripcion:'',
    adjunto:'',
    soporte:''} as EventoObj;

this.egresadosSave={
  idAsistenciaEvento:'',
  nombres:'',
  apellidos:'',
  idEgresado:'',
  inscrito:'0',
  asistio:'0',
  aprobo:'0',
  idEvento:''
} as Egresados;
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
    this.idEdit = info.idEvento;
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
      ajax: this.url+'getEventos',

      columns: [{
        title: 'ID',
        data: 'idEvento',
        visible: false
      }, {
        title: 'Nombre',
        data: 'nombre'
      },
      {
        title: 'Fecha Inicio',
        data: 'fechaInicio'
      },
      {
        title: 'Fecha Fin',
        data: 'fechaFin'
      }
    ],
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

    this.getTiposEvento();
  }

addEgresados(content){

  if(this.idEdit == ''){
      this.openNotification('Debe seleccionar un evento','error');
  }else{

    console.log("valor edit"+this.idEdit);
    this.getEgresados();
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.cleanForm();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.cleanForm();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    }
}
  open(content, action:string) {
  console.log("sfsfds");
      if(action == 'edit'){
        console.log("valor edit"+this.idEdit);

        if(this.idEdit != '' && this.idEdit != null){
          console.log("ingreso")
          let callBack = this.facService.getEventobyId(this.idEdit);
          callBack.subscribe(res => {
            let data = res.json();
            console.log(data);
            if(data.status && data.status === 'OK'){
              var programa = data.data;
              this.evento = programa;
              var h=programa.horaInicio.replace('AM','');
              h=programa.horaInicio.replace('PM','');
              this.evento.horaInicio=h;
              this.duracionEstimada=this.evento.duracionEstimada;

              if(this.evento.duracionEstimada.indexOf('dias') > -1){
                  console.log(this.evento.duracionEstimada.replace('dias',''));
                this.duracionEstimada=parseInt(this.evento.duracionEstimada.replace('dias',''));
                this.cbotipoduracion='dias';
              }
              if(this.evento.duracionEstimada.indexOf('horas')  > -1){
                this.duracionEstimada=parseInt(this.evento.duracionEstimada.replace('horas',''));
                this.cbotipoduracion='horas';
              }

              if(this.evento.duracionEstimada.indexOf('años')  > -1){
                this.duracionEstimada=parseInt(this.evento.duracionEstimada.replace('años',''));
                this.cbotipoduracion='años';
              }

              if(this.evento.duracionEstimada.indexOf('minutos')  > -1){
                console.log(this.evento.duracionEstimada.replace('minutos',''));
                this.duracionEstimada=parseInt(this.evento.duracionEstimada.replace('minutos',''));
                this.cbotipoduracion='minutos';
              }
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

  validateForm(){
    //idEvento==''){}
    var message='';

    if(this.evento.idTipoEvento==''){message+='Es obligatorio el ingreso del tipo de evento \n';}
    if(this.evento.nombre==''){message+='Es obligatorio el ingreso del nombre de evento \n';}
    if(this.evento.fechaInicio==''){message+='Es obligatorio el ingreso de la fecha de inicio \n';}
    if(this.evento.fechaFin==''){message+='Es obligatorio el ingreso de la fecha fin \n';}
    if(this.evento.lugar==''){message+='Es obligatorio el ingreso del lugar \n';}
    if(this.evento.horaInicio==''){message+='ES obligatorio el ingreso de la hora de inicio \n';}
    if(this.duracionEstimada==''){message+='ES obligatorio el ingreso de la duracion estimada \n';}
    if(this.evento.costoEgresado==''){message+='Es obligatorio el ingreso del costo de egresado \n';}
    if(this.evento.costoUniajc==''){message+='Es obligatorio el ingreso del costo Uniajc \n';}
    if(this.evento.certificable==''){message+='Es obligatorio indicar si es certificable \n';}
    if(this.evento.dependenciaOrganiza==''){message+='Es obligatorio ingresa que dependencia organiza \n';}
    if(this.evento.dependenciaBeneficiaria==''){message+='Es obligatorio el ingreso de dependencia Beneficiaria \n';}
    if(this.evento.comunidadBeneficiaria==''){message+='Es obligatorio el ingreso de la comunidad beneficiada \n';}
    if(this.evento.personaACargo==''){message+='ES obligatorio el ingreso de las personas a cargo \n';}
    if(this.evento.correoElectronico==''){message+='Es obligatorio el ingreso de el correo electronico \n';}
    if(this.evento.telefono==''){message+='Es obligatorio el ingreso del telefono \n';}
    if(this.evento.cuposEgresados==''){message+='ES obligatorio el ingreso de los cupos de egresado \n';}
    //if(this.evento.bannerEvento==''){}
    if(this.evento.urlInscripcion==''){message+='Es obligatorio el ingreso de la url de inscripcion \n';}
    if(message==''){
      var f=new Date(this.evento.fechaInicio);
      var ff=new Date(this.evento.fechaFin);
      if(f > ff){
        this.openNotification("La fecha de inicio no puede ser mayor a la fecha fin","error");
        return true;
      }
      this.evento.fechaInicio=f.getTime()+"";
      this.evento.fechaFin=ff.getTime()+"";
      return false;
    }else{
        //this.openNotification(message,"error");
        this.openNotification("Todos los campos son obligatorios","error");
      return true;
    }
  }

  saveFomr(){

    if( this.validateForm()){

    }else{
      this.evento.adjunto='1';
      this.evento.soporte='1';
      this.evento.bannerEvento='1';
      this.evento.duracionEstimada=this.duracionEstimada+' '+this.cbotipoduracion;
      let data = this.evento;
      let callBack = this.facService.saveEvento(data); //editar para Eventos !!!!!!!!
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
  getEgresados(){
    let callBack = this.facService.getEgresados(); //editar para programas !!!!!!!!
    callBack.subscribe(res => {
        let data = res.json();

        let status = data.status;

        if(status == 'OK'){
          this.getEgresadosbyEvent(data.data);

          //this.listEgresados = data.data as  Egresados[];
        }
        else{
        //  this.openNotification('Error al obtener los programas:'+data.message, 'error');

        }


    });
  }

getEgresadosEnEvento(obj,lst){

  for(var i=0;i<lst.length;i++){
      if(lst[i].idEgresado==obj.idEgresado){
        lst[i].nombres=obj.nombres;
        lst[i].apellidos=obj.apellidos;
          return lst[i] as Egresado;
        break;

      }
  }
  obj.inscrito='0';
  obj.asistio='0';
  obj.aprobo='0';
  obj.idAsistenciaEvento='';
  return obj as Egresado;

}
  getEgresadosbyEvent(lst){

    let callBack = this.facService.getEgresadosbyEvent(this.idEdit); //editar para programas !!!!!!!!
    callBack.subscribe(res => {
        let data = res.json();

        let status = data.status;

        if(status == 'OK'){
          var listado=data.data;
          var lstnew=[];
          for(var i=0;i<lst.length;i++){

            lstnew.push(  this.getEgresadosEnEvento(lst[i],listado));
          }

          this.listEgresados = lstnew as  Egresados[];
          console.log(this.listEgresados);
        }
        else{
        //  this.openNotification('Error al obtener los programas:'+data.message, 'error');

        }


    });
  }
  getTiposEvento(){
    let callBack = this.facService.getTipoEventos(); //editar para programas !!!!!!!!
    callBack.subscribe(res => {
        let data = res.json();

        let status = data.status;

        if(status == 'OK'){
          this.listTipoEventos = data.data as  TipoEvento[];
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

  handleFileInput(files: FileList) {

     var fd = new FormData();
      fd.append("file",files.item(0),files.item(0).name);
      let callBack = this.facService.saveFile(fd); //editar para programas !!!!!!!!
      callBack.subscribe(res => {
      });

  }

  agregarEgresados(id:string,estado:string,idassi:string){
    this.egresadosSave.idEvento=this.idEdit;
    this.egresadosSave.idEgresado=id;
    this.egresadosSave.idAsistenciaEvento=idassi;
        if(estado=='inscrito'){

        this.egresadosSave.inscrito='1';
    }

    if(estado=='asistio'){

    this.egresadosSave.asistio='1';
}

if(estado=='aprobo'){

this.egresadosSave.aprobo='1';
}
      let callBack = this.facService.saveAsistioEvento(this.egresadosSave);

      callBack.subscribe(res => {
          let data = res.json();

          let status = data.status;

          if(status == 'OK'){
          /*  this.messageValidation = 'Registro exitoso';
            this.alertMessage(this.messageValidation);
            this.modalRef.close();*/

            this.getEgresados();

          }
          else{
            this.messageValidation = 'Ocurrio un error al guardar el registro';
            this.alertMessage(this.messageValidation);
          }
      })



  }

}
