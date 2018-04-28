import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-blank-page',
    templateUrl: './ges-encuesta.component.html',
    styleUrls: ['./ges-encuesta.component.css']
})
export class GesEncuenstaComponent implements OnInit {
    constructor(private route: ActivatedRoute) {

      this.route.params.subscribe( params => console.log(params) );
      
    }

    ngOnInit() {}
}
