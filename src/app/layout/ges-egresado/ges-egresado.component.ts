import {AfterViewInit, Component, NgZone, OnInit,ViewChild,  ViewEncapsulation} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector : 'app-ges-egresado',
  templateUrl: './ges-egresado.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./ges-egresado.component.css'],
  animations: [routerTransition()]
})

export class GesEgresadoComponent implements OnInit, AfterViewInit{

  //@ViewChild(DataTableDirective)
  //dtElement: DataTableDirective;
  //dtTrigger: Subject<any> = new Subject();
  modalRef:any;

  message = '';
  messageValidation = '';
  idEdit:string;

  cellSelect:any;
  dtOptions: any = {};
  closeResult: string;



  constructor(private modalService: NgbModal/*, private router: Router*/){
    /*this.idEdit = '';
    this.cellSelect = {
      id : ''
    }
    this.message = 'No se ha seleccionado una fila';*/

  }

  ngAfterViewInit(): void {
  //  this.dtTrigger.next();

  }
/*
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
*/

  ngOnInit(){
  }

  showForm(){
  }

  openGesEncuesta(){
    this.router.navigate(['ges-encuesta', '1']);
  }

  open(content) {
      this.modalService.open(content,{ windowClass: 'modal-m-size', size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
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

}
