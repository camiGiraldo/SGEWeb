import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector : 'app-ges-egresado',
  templateUrl: './ges-egresado.component.html',
  styleUrls:['./ges-egresado.component.css'],
  animations: [routerTransition()]
})

export class GesEgresadoComponent implements OnInit{
closeResult: string;

  constructor(private modalService: NgbModal){}

  ngOnInit(){
  }

  showForm(){
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
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
