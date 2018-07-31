import {AfterViewInit, Component, NgZone, OnInit,ViewChild,  ViewEncapsulation} from '@angular/core';
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
import * as $ from 'jquery';

@Component({
    selector: 'app-blank-page',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [routerTransition()]
})
export class ReportesComponent implements OnInit, AfterViewInit {

  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions:any;
  dtOptRepEgresados:any;
  @ViewChild('reportOne') public modalReportOne:NgbModal;
  @ViewChild('reportTwo') public modalReportEgresados:NgbModal;
  modalRef:any;
  modalRefRepoEgresados:any;

  public url:string;

    constructor(private zone: NgZone, private modalService: NgbModal) {
      this.url = environment.urlServices;
    }

    ngOnInit(): void {
      this.dtOptions = {};
      this.dtOptRepEgresados = {};
    }

    openReportOne() {
      this.dtOptions = {
        ajax:{
          url:this.url+'getEgresadosXPrograma',
          type:'POST',
          data:{
            idPrograma:20,
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
      this.modalRef = this.modalService.open(this.modalReportOne, { windowClass : 'bigModal' });
    }

    openReportEgresados(){
        this.dtOptRepEgresados = {
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
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [
          'excel'
        ]
      };
      this.modalRefRepoEgresados = this.modalService.open(this.modalReportEgresados, { windowClass : 'bigModal' });
    }

    ngAfterViewInit(): void {
     //this.dtTrigger.next();

   }



}
